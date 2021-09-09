export class Product {

  constructor(public active: boolean,
              public created: Date,
              public description: string,
              public imageUrl: string,
              public lastUpdated: Date,
              public name: string,
              public sku: string,
              public unitPrice: number,
              public unitsInStock: number) {}
}
