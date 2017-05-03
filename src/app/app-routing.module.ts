import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import {RecipeStartComponent} from './components/recipes/recipe-start/recipe-start.component';
import {RecipeDetailComponent} from './components/recipes/recipe-detail/recipe-detail.component';
// import {RecipeEditComponent} from 'app/components/recipes/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
// import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
// import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
  //   { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent },
  //   { path: ':id/edit', component: RecipeEditComponent }
  ] },
  // { path: 'shopping-list', canActivate: [AuthGuardService], component: ShoppingListComponent },
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
