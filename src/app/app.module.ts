import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';

import { ProductService } from "./services/product.service";
import {ProductCategoryService} from "./services/product-category.service";

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SearchComponent } from './components/search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryMenuComponent,
    ProductDetailsComponent,
    ProductListComponent,
    SearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgbModule                                           // Exose the exported declarations (classes, interfaces, constants,...) in this module and makes them available in the current module
  ],
  providers: [ProductService, ProductCategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
