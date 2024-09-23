import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any; // Product object to store the details

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id')||''; // Get product ID from route
    this.product = this.productService.getProductById(productId); // Fetch product details
  }

  addToCart() {
    // Logic to add the product to the cart
    console.log(`Product ${this.product.name} added to cart.`);
  }
}
