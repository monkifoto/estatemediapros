import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  editProduct(product: Product) {
    this.router.navigate(['/admin/add-product', product.id]);
  }
  deleteProduct(productId: string) {
    //this.productService.deleteProduct(productId);
  }
}
