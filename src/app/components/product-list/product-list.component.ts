import { Component, OnInit } from '@angular/core';
import { Product } from "../../common/product";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];		// Define a (public) property 'products' which is of type Product[]
  currentCategoryId: number;
  hasKeyword: boolean;

  // Inject our ProductService via constructor injection
  constructor(private productService: ProductService,
              private route: ActivatedRoute) {                    // Current active route that loaded the component, which can be used for accessing route parameters
    this.products = [];
    this.currentCategoryId = 1;
    this.hasKeyword = false;
  }

  ngOnInit(): void {				// Similar to @PostConstruct from Spring
    this.route.paramMap.subscribe(() => {
      this.listProducts();    // On initialization execute this function
    });
  }

  listProducts() {
    // check if 'keyword' parameter is available. so we know a search by keyword was performed
    this.hasKeyword = this.route.snapshot.paramMap.has('keyword');

    if (this.hasKeyword) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    // now search for the products using keyword
    const currentKeyword: string = '' + this.route.snapshot.paramMap.get('keyword'); // Use + to put empty string in the variable in case the keyword value would be null
    this.productService.searchProductsByKeyword(currentKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts() {
    // check if 'id' parameter is available, so we know we can use it or need to use a default
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');	// route.snapshot means use the activated route and get its current state. From that get the Map of all the route parameters. Check that it has a 'id'  parameter value.

    if (hasCategoryId) {
      // Get the 'id' value and convert the string to a number using the '+' symbol
      this.currentCategoryId = + this.route.snapshot.paramMap.get('id')!;  // ! Do no concern about possible null values
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
