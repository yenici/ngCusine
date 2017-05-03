import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { AuthenticationComponent } from './components/auth/authentication.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipes/recipe-item/recipe-item.component';

import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    ShoppingListComponent,
    AuthenticationComponent,
    SignInComponent,
    SignUpComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [FirebaseService, AuthService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
