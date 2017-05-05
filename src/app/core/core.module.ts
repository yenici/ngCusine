import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AuthModule } from '../components/auth/auth.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { RecipeService } from '../services/recipe.service';
import { ShoppingListService } from '../services/shopping-list.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    AuthModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    FirebaseService,
    AuthService,
    AuthGuardService,
    RecipeService,
    ShoppingListService
  ]
})
export class CoreModule {}
