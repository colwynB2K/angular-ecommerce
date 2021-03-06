import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import {Product} from "../../common/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  private handleProductDetails() {
    const productIdString: string | null = this.route.snapshot.paramMap.get('id');
    if (productIdString) {
      // Get the 'id' param string, convert it to a number using the '+'symbol
      const productId: number = +productIdString;

      this.productService.getProduct(productId).subscribe(
        data => {
          this.product = data;
        }
      )

    }
  }
}
