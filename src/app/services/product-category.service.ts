import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProductCategory } from "../common/product-category";

// Angular has built in support for a dependency injection framework
// This service can be injected into other components or class as a dependency
@Injectable({
  providedIn: 'root'                  // You can inject it anywhere within the Angular App, not only in certain components or classes
})
export class ProductCategoryService {

  private baseUrl = 'http://localhost:8080/api/product-categories';

  // Our service also uses dependency injection... the HttpClient is injected into it via constructor injection
  constructor(private httpClient: HttpClient) { }

  // This function returns an Observable so components/classes can subscribe to it
  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponse>(this.baseUrl)
                          .pipe(
                            map(response => response._embedded.categories)
                          ); // This describes the structure of the JSON response from Spring Data REST and map it to a Product array voa the GetResponse interface
  }
}

interface GetResponse {
  _embedded: {
    categories: ProductCategory[];			// Unwrap the JSON from the _embedded JSON entry and map it to a Product array
  }
}
