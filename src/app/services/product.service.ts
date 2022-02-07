import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../common/product";
import { map } from "rxjs/operators";

// Angular has built in support for a dependency injection framework
// This service can be injected into other components or class as a dependency
@Injectable({
  providedIn: 'root'				// You can inject it anywhere within the Angular App, not only in certain components or classes
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  // Our service also uses dependency injection... the HttpClient is injected into it via constructor injection
  constructor(private httpClient: HttpClient) { }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponse>(searchUrl)
      .pipe(
        map(response => response._embedded.products)
      );
  }

  // This function returns an Observable so components/classes can subscribe to it
  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProducts(searchUrl); // This describes the structure of the JSON response from Spring Data REST and map it to a Product array voa the GetResponse interface
  }

  searchProductsByKeyword(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContainingIgnoreCase?keyword=${encodeURIComponent(keyword)}`;

    return this.getProducts(searchUrl);
  }

  getProduct(productId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${productId}`;			// http://localhost:8080/api/products/${productId}

    return this.httpClient.get<Product>(productUrl);				// Call REST API which returns an Observable. The JSON Data returned can be converted directly to a Product object => no need to unwrap the JSPN from Spring Data REST. There is no _embedded entry. The JSON properties mapp directly to properties in the Product TypeScript class.
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];			// Unwrap the JSON from the _embedded JSON entry and map it to a Product array
  }
}
