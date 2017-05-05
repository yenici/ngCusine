import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.recipeService.getRecipe(params['id'])
          .then((recipe: Recipe) => this.recipe = recipe)
          .catch(console.log); // TODO: Error handling
      });
  }

  onAddToShoppingList() {
    if (this.recipe) {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }
  }

  onEditRecipe() {
    if (this.recipe) {
      // this.router.navigate(['../', this.recipe.id, 'edit'], { relativeTo: this.route });
      this.router.navigate(['edit'], { relativeTo: this.route });
    }
  }

  onDeleteRecipe() {
    this.recipeService.delete(this.recipe.id)
      .then()
      .catch(); // TODO: Error handling
    this.router.navigate(['/recipes']);
  }
}
