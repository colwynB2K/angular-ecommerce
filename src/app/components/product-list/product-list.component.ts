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
  previousCategoryId: number;
  hasKeyword: boolean;
  previousKeyword: string = '';

  // new properties for pagination
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  // Inject our ProductService via constructor injection
  constructor(private productService: ProductService,
              private route: ActivatedRoute) {                    // Current active route that loaded the component, which can be used for accessing route parameters
    this.products = [];
    this.currentCategoryId = 1;
    this.previousCategoryId = this.currentCategoryId;
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

    // Note: Angular will reuse a component if it is currently being viewed in the browser!!! So it is possible that there is some leftover state from the previous call
    // So we need to check if we have a different keyword than before and in that case we have to reset the pageNumber
    if (currentKeyword != this.previousKeyword) {
      this.pageNumber = 1;
    }

    // Get the products for the given category id with pagination suport
    this.productService.searchProductsByKeyword(this.pageNumber - 1, 				// - 1 as in the Angular pagination component, the pages are 1 based while in Spring Data REST, the pages are 0 based
      this.pageSize,
      currentKeyword)
      .subscribe(this.processResult());			                  // Get product list via asynchronous REST call and subscribe to the response to process it when it arrives
  }

  handleListProducts() {
    // check if 'id' parameter is available, so we know we can use it or need to use a default
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');	// route.snapshot means use the activated route and get its current state. From that get the Map of all the route parameters. Check that it has a 'id'  parameter value.

    // Note: Angular will reuse a component if it is currently being viewed in the browser!!! So it is possible that there is some leftover state from the previous call
    // So we need to check if we have a different category ID than before and in that case we have to reset the pageNumber
    if (this.currentCategoryId != this.previousCategoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId = ${this.currentCategoryId}, pageNumber = ${this.pageNumber}`);

    if (hasCategoryId) {
      // Get the 'id' value and convert the string to a number using the '+' symbol
      this.currentCategoryId = + this.route.snapshot.paramMap.get('id')!;  // ! Do no concern about possible null values
    } else {
      // no category id available, just default to category id 1
      this.currentCategoryId = 1;
    }

    // Get the products for the given category id with pagination suport
    this.productService.getPageableProductList(this.pageNumber - 1, 				// - 1 as in the Angular pagination component, the pages are 1 based while in Spring Data REST, the pages are 0 based
                                                this.pageSize,
                                                this.currentCategoryId)
                                              .subscribe(this.processResult());			                  // Get product list via asynchronous REST call and subscribe to the response to process it when it arrives

  }

  private processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1; 																	// In the Angular pagination component the pages are 1 based while in Spring Data REST, the pages are 0 based
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  updatePageSize(newPageSize: string) {
    this.pageSize = +newPageSize;                                                 // Convert string to number using + sign
    this.pageNumber = 1;                                                          // reset page number after changing the page size! As page number depends on the page size!
    this.listProducts();                                                          // fetch the products using this new page size
  }

}
