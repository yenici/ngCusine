import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Ingredient} from '../../../models/ingredient.model';
import {ShoppingListService} from '../../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  private startedEditingSubscription: Subscription;
  private editedItemIndex: number;
  private editedItem: Ingredient;
  public isEditMode = false;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.startedEditingSubscription = this.shoppingListService.startedEditing
      .subscribe((index: number) => {
        this.isEditMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (this.isEditMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(value.name, +value.amount, value.unit));
    } else {
      this.shoppingListService.addIngredient(new Ingredient(value.name, +value.amount, value.unit));
    }
    this.isEditMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.isEditMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    if (this.startedEditingSubscription) {
      this.startedEditingSubscription.unsubscribe();
    }
  }
}
