import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "./components/product-list/product-list.component";

const routes: Routes = [
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},					// PATH HAS NO LEADING SLASHES!!!
  {path: 'categories', component: ProductListComponent},						// PATH HAS NO LEADING SLASHES!!!, no id param specified default id is used inside the component
  {path: 'products', component: ProductListComponent},								// PATH HAS NO LEADING SLASHES!!!, no id param specified default id is used inside the component
  {path: '', redirectTo: '/products', pathMatch: 'full'},								// REDIRECT PATH HAS LEADING SLASHES!!!, full means to match on this path exactly (default value is 'prefix', matches if path starts with this value)
  {path: '**', redirectTo: '/products', pathMatch: 'full'}							// REDIRECT PATH HAS LEADING SLASHES!!!, default route if none of the above match
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
