import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
    {
      id: '1',
      name: 'SSD Clamp Mount',
      image: 'path-to-image',
      description: 'High-quality SSD clamp mount for various applications.',
      price: 34.99,
      oldPrice: 39.99
    },
    // Add more products here
  ];

  constructor() {}

  getProductById(id: string) {
    return this.products.find(product => product.id === id);
  }
}
