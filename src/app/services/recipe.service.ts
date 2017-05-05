import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { FirebaseService } from './firebase.service';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
  public recipesChanged = new BehaviorSubject<Recipe[]>([]);

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
   * @param {string} key
   * @param {string} name
   * @param {string} description
   * @param {string} imagePath
   * @param {Ingredient[]} ingredients
   * @returns {Recipe}
   */
  private static extractRecipe(key: string, { name, description, imagePath, ingredients }): Recipe {
    const parsedIngredients = RecipeService.extractIngredients(ingredients);
    return new Recipe({ id: key, name, description, imagePath, ingredients: parsedIngredients });
  }

  /**
   * Create an array of ingredients
   * @param data: any[]
   * @returns {Ingredient[]}
   */
  private static extractIngredients(data: any[]): Ingredient[] {
    let ingredients: Ingredient[] = [];
    if (data && data.length) {
      ingredients = data.map(ingredient => new Ingredient(ingredient.name, ingredient.amount, ingredient.unit));
    }
    return ingredients;
  }

  constructor(private firebaseService: FirebaseService, private shoppingListService: ShoppingListService) {
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

  async getRecipe(id: string): Promise<Recipe | null> {
    try {
      const recipe = await this.fetchRecipe(id);
      if (!recipe) {
        return null;
      }
      const ingredients = await this.fetchIngredients(id);
      return new Recipe({ ...recipe, ingredients });
    } catch (e) {
      console.log('ERROR', e); // TODO: Error handling
    }
  }

  private fetchRecipe(id: string): Promise<Recipe | null> {
    return new Promise((resolve, reject) => {
      this.firebaseService.database.ref(`recipes/${id}`)
        .once('value',
          (snapshot: firebase.database.DataSnapshot) =>
            resolve(snapshot.val() ? RecipeService.extractRecipe(id, snapshot.val()) : null),
          (error) => reject('Error: ' + error.code) // TODO: Error handling
        );
    });
  }

  private fetchIngredients(id: string): Promise<Ingredient[]> {
    return new Promise((resolve, reject) => {
      this.firebaseService.database.ref(`ingredients/${id}`)
        .once('value',
          (snapshot: firebase.database.DataSnapshot) => resolve(RecipeService.extractIngredients(snapshot.val())),
          (error) => reject('Error: ' + error.code) // TODO: Error handling
        );
    });
  }

  /**
   * Create a new recipe
   * @param {Recipe} recipe
   * @returns {firebase.Promise<any>}
   */
  create(recipe: Recipe): firebase.Promise<void> {
    const id = this.firebaseService.database.ref().child('recipes').push().key;
    const updates = {};
    updates['/recipes/' + id] = {
      name: recipe.name,
      description: recipe.description,
      imagePath: recipe.imagePath
    };
    if (recipe.ingredients && recipe.ingredients.length) {
      updates['/ingredients/' + id] = recipe.ingredients;
    }
    return this.firebaseService.database.ref().update(updates);
  }

  update(recipe: Recipe): firebase.Promise<void> {
    const updates = {};
    updates['/recipes/' + recipe.id] = {
      name: recipe.name,
      description: recipe.description,
      imagePath: recipe.imagePath
    };
    if (recipe.ingredients && recipe.ingredients.length) {
      updates['/ingredients/' + recipe.id] = recipe.ingredients;
    } else {
      updates['/ingredients/' + recipe.id] = null;
    }
    return this.firebaseService.database.ref().update(updates);
  }

  delete(id: string): firebase.Promise<void> {
    const updates = {
      ['/recipes/' + id]: null,
      ['/ingredients/' + id]: null,
    };
    return this.firebaseService.database.ref().update(updates);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

}
