import { Component, OnInit } from '@angular/core';
import {ProductCategory} from "../../common/product-category";

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(private productCategoryService: ProductCategoryService) { }		// Inject ProductCategoryService

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productCategoryService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories = ' + JSON.stringify(data));			// Log incoming data
        this.productCategories = data;											              // Assign the data
      }
    )
  }
}
