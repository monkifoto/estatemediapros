import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product.model';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-staging',
  templateUrl: './staging.component.html',
  styleUrls: ['./staging.component.css']
})
export class StagingComponent implements OnInit {
  products!: Product[];
  @Input()
  listOfProducts: Product[] = [];
  selectedProduct: any = null;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.products = this.listOfProducts;
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }

  viewDetails(product: any) {
    this.selectedProduct = product;
  }

  // Function to close the product details view
  closeDetails() {
    this.selectedProduct = null;
  }
}
