// product-item.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/Model/product.model';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;  // Input property to receive product data
  @Output() viewDetails = new EventEmitter<Product>();
  selectedProduct: Product | null = null;  // Track selected product for details view

  constructor(private cartService: CartService) {}

  addToCart(product: Product): void {
    this.cartService.addProduct(product);
  }

  viewProductDetails() {
    this.viewDetails.emit(this.product);
  }
  
  closeDetails(): void {
    this.selectedProduct = null;
  }
}
