import { Component, OnInit } from '@angular/core';
import { Product } from "../../common/product";
import { ProductService } from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];		// Define a (public) property 'products' which is of type Product[]
  currentCategoryId: number;

  // Inject our ProductService via constructor injection
  constructor(private productService: ProductService,
              private route: ActivatedRoute) {                    // Current active route that loaded the component, which can be used for accessing route parameters
    this.products = [];
    this.currentCategoryId = 1;
  }

  ngOnInit(): void {				// Similar to @PostConstruct from Spring
    this.route.paramMap.subscribe(() => {
      this.listProducts();    // On initialization execute this function
    });
  }

  listProducts() {

    // check if 'id' parameter is available, so we know we can use it or need to use a default
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');	// route.snapshot means use the activated route and get its current state. From that get the Map of all the route parameters. Check that it has a 'id'  parameter value.

    // check if 'keyword' parameter is available. so we know a search by keyword was performed
    const hasKeyword: boolean = this.route.snapshot.paramMap.has('keyword');

    if (hasKeyword) {
      // now search for the products using keyword
      this.productService.searchProductsByKeyword(this.route.snapshot.paramMap.get('keyword')).subscribe(
        data => {
          this.products = data;
        }
      )
    } else {
      if (hasCategoryId) {
        // Get the 'id' value and convert the string to a number using the '+' symbol
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;  // ! Do no concern about possible null values
      } else {
        // no category id available, just default to category id 1
        this.currentCategoryId = 1;
      }

      // Get the products for the given category id
      this.productService.getProductList(this.currentCategoryId).subscribe(			// Get product list via asynchronous REST call and subscribe to the response to process it when it arrives
        data => {
          this.products = data;							              // Assign the Product[] coming from the ProductService to the products property in this ProductListComponent class
        }
      )
    }
  }

}
