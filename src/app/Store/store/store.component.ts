import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  activeTab: string = 'photos';
  selectedSqFt: string = '1000-2000';
  product: any; // Product object to store the details
  products: Product[] | undefined;

  constructor( private route: ActivatedRoute, public productService: ProductService){}
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id')||''; // Get product ID from route
    this.product = this.productService.getProductById(productId); // Fetch product details
  }

  addToCart() {
    // Logic to add the product to the cart
    console.log(`Product ${this.product.name} added to cart.`);
  }
}
