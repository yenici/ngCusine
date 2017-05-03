import {Ingredient} from './ingredient.model';

export class Recipe {
  public id: string;
  public name = '';
  public description = '';
  public imagePath = '';
  public ingredients = [];

  constructor(data: object) {
    Object.assign(this, data);
  }

  // constructor(
  //   public name: string,
  //   public description: string,
  //   public imagePath: string,
  //   public ingredients: Ingredient[],
  //   id?: string
  // ) {
  //   if (id) {
  //     this.uid = id;
  //   }
  // }
  //
  // get id() {
  //   return this.uid;
  // }

  get isNew() {
    return !this.id;
  }

  // update(
  //   name: string,
  //   description: string,
  //   imagePath: string,
  //   ingredients: Ingredient[]
  // ) {
  //   this.name = name;
  //   this.description = description;
  //   this.imagePath = imagePath;
  //   this.ingredients = ingredients;
  // }
}
