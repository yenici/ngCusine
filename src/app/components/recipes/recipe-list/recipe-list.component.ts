import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipeSubscription: Subscription;
  private recipes: Recipe[];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes,
      (error: string) => console.log('ERROR', error) // TODO: Error handling
    );
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
