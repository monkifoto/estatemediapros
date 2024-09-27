import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/Model/product.model';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  products!: Product[];
  @Input()
  listOfProducts: Product[] = [];
  @Output() viewProductDetails = new EventEmitter<Product>();
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

  viewDetails(product: Product) {
    this.viewProductDetails.emit(product); // Emit the product to the parent
  }


}
