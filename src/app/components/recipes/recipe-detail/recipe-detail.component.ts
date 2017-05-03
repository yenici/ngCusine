import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  private recipe: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        // console.log('ID', params['id']);
        this.recipeService.getRecipe(params['id'])
          .then(recipe => this.recipe = recipe);
          // .subscribe((recipe: Recipe) => this.recipe = recipe);
      });
  }

}
