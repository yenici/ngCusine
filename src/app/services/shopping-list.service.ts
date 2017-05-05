import { Injectable } from '@angular/core';

import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [];

  constructor() { }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  getIngredients() {
    return [...this.ingredients];
  }

  addIngredient(ingredient: Ingredient) {
    this.addIngredientToList(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ingredient => this.addIngredientToList(ingredient));
    this.ingredientsChanged.next(this.getIngredients());
  }

  private addIngredientToList(ingredient: Ingredient) {
    const ingredientFromList = this.ingredients.find(storedIngredient => storedIngredient.name === ingredient.name);
    if (ingredientFromList) {
      ingredientFromList.amount += ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.getIngredients());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.getIngredients());
  }
}
