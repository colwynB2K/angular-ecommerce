import { Component, OnInit } from '@angular/core';
import { Product } from "../../common/product";
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];		// Define a (public) property 'products' which is of type Product[]

  // Inject our ProductService via constructor injection
  constructor(private productService: ProductService) { }

  ngOnInit(): void {				// Similar to @PostConstruct from Spring
    this.listProducts();    // On initialization execute this function
  }

  listProducts() {		      // Define the function to be executed on init
    this.productService.getProductList().subscribe(			// Get product list via asynchronous REST call and subscribe to the response to process it when it arrives
      data => {
        this.products = data;							              // Assign the Product[] coming from the ProductService to the products property in this ProductListComponent class
      }
    )
  }

}
