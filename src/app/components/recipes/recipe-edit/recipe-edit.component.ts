import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { Ingredient } from '../../../models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  private recipeForm: FormGroup;
  public recipe: Recipe;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.recipeService.getRecipe(params['id'])
          .then((recipe: Recipe) => {
            this.recipe = recipe ? recipe : new Recipe({});
            this.initForm();
          })
          .catch((e) => { console.log('W T F !!!', e); }); // TODO: Error handling
      });
  }

  private initForm() {
    const recipeIngredients = new FormArray([]);

    if (this.recipe.ingredients && this.recipe.ingredients.length) {
      this.recipe.ingredients.forEach((ingredient: Ingredient) => {
        recipeIngredients.push(new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [
            Validators.required,
            Validators.pattern('^[1-9]+[0-9]*$')
          ]),
          'unit': new FormControl(ingredient.unit, Validators.required)
        }));
      });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(this.recipe.name, Validators.required),
      'imagePath': new FormControl(this.recipe.imagePath, Validators.required),
      'description': new FormControl(this.recipe.description),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    const recipeValues = {
      name: this.recipeForm.value['name'],
      description: this.recipeForm.value['description'],
      imagePath: this.recipeForm.value['imagePath'],
      ingredients: this.recipeForm.value['ingredients']
    };
    this.recipe.update(recipeValues);
    if (this.recipe.isNew) {
      this.recipeService.create(this.recipe)
        .then(() => console.log('Recipe created'))
        .catch(() => console.log('Recipe create error')); // TODO: Error handling
    } else {
      this.recipeService.update(this.recipe)
        .then(() => console.log('Recipe saved'))
        .catch(() => console.log('Recipe save error')); // TODO: Error handling
    }
    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }

  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$')
      ]),
      'unit': new FormControl(null, Validators.required)
    }));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
