import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product.model';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  products!: Product[];
 @Input()
  listOfProducts: Product[] = [];

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


}
