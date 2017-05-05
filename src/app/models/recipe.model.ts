import { Ingredient } from './ingredient.model';

export class Recipe {
  public id: string;
  public name = '';
  public description = '';
  public imagePath = '';
  public ingredients: Ingredient[] = [];

  constructor(recipe?: object) {
    if (recipe) {
      Object.assign(this, recipe);
    }
  }

  get isNew(): boolean {
    return !this.id;
  }

  update(recipe: object): void {
    const id = this.id;
    Object.assign(this, recipe, { id });
  }
}
