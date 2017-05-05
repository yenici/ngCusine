import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipeSubscription: Subscription;
  recipes: Recipe[];

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeSubscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => this.recipes = recipes,
        (error: string) => console.log('ERROR', error) // TODO: handle error
      );
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
