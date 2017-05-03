import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase/app';
import 'firebase/database';

import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { FirebaseService } from './firebase.service';

@Injectable()
export class RecipeService {
  public recipesChanged = new Subject<Recipe[]>();

  /**
   * Transform response from Firebase into the array of recipes
   * @param object: Firebase data object
   * @returns {Recipe[]}
   */
  private static  extractRecipes(data: object): Recipe[] {
    const recipes: Recipe[] = [];

    if (!data) {
      return recipes;
    }

    Object.keys(data).forEach((key: string) => {
      recipes.push(RecipeService.extractRecipe(key, data[key]));
    });

    return recipes;
  }

  /**
   * Create a Recipe from an object
   * @param key: string
   * @param name: string
   * @param description: string
   * @param imagePath: string
   * @param ingredients: Ingredient[]
   * @returns {Recipe}
   */
  private static extractRecipe(key: string, { name, description, imagePath, ingredients }): Recipe {
    const parsedIngredients = ingredients.map(ingredient => new Ingredient(ingredient.name, ingredient.amount));
    return new Recipe({ id: key, name, description, imagePath, ingredients: parsedIngredients });
    // return new Recipe(name, description, imagePath, parsedIngredients, key);
  }

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.database.ref('recipes')
      .on('value',
        (snapshot: firebase.database.DataSnapshot) => {
          this.recipesChanged.next(RecipeService.extractRecipes(snapshot.val()));
        },
        (error) => {
          console.log('Error: ' + error.code); // TODO: Error handling
        }
      );
  }

  getRecipe(id: string): any {
    return new Promise((resolve, reject) => {
      this.firebaseService.database.ref(`recipes/${id}`)
        .once('value',
          (snapshot: firebase.database.DataSnapshot) => {
            resolve(RecipeService.extractRecipe(id, snapshot.val()));
            // return resolve(snapshot.val());
            // console.log(snapshot.val());
            // this.recipesChanged.next(RecipeService.extractRecipes(snapshot.val()));
          },
          (error) => {
            console.log('Error: ' + error.code); // TODO: Error handling
            reject('Error: ' + error.code);
          }
        );
    });
  }

}
