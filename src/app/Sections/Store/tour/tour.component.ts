import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/Model/product.model';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent implements OnInit {
  products!: Product[];
  @Input()
  listOfProducts: Product[] = [];
  @Output() viewProductDetails = new EventEmitter<Product>();

  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.products = this.listOfProducts;
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }

  viewDetails(product: Product) {
    this.viewProductDetails.emit(product); // Emit the product to the parent
  }
}
