import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingListModule } from './components/shopping-list/shopping-list.module';

import { AppComponent } from './components/app/app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    ShoppingListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
