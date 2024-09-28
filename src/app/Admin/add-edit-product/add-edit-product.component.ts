import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  @Input() product: Product = {
    id: '',
    name: '',
    description: '',
    imageUrl: '',
    baseSqFt: 0,
    basePrice: 0,
    priceIncrementPerSqFt: 0,
    incrementSqFtStep: 0,
    price: 0,
    productType: '',
    isDetailsVisible: false,
    isActive: true,
    isPromotion: false,
    promotionDiscount: 0
  };

  editingProduct: boolean = false;

  constructor(
    private productService: ProductService, // Service to handle products
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if the route has a product ID to edit
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.editingProduct = true;
      this.loadProduct(productId);
    }
  }

  // Function to load the product for editing
  loadProduct(id: string) {
    const product = this.productService.getProductById(id);
    if (product) {
      this.product = product; // only assign if product is found
    } else {
      // Handle the case where the product isn't found, e.g., navigate to a 404 page or show an error message
      console.error('Product not found');
    }
  }

  // Save or update product on form submission
  onSubmit() {
    // if (this.editingProduct) {
    //   this.productService.updateProduct(this.product).subscribe(() => {
    //     this.router.navigate(['/admin/products']); // Navigate back to the product list
    //   });
    // } else {
    //   this.productService.addProduct(this.product).subscribe(() => {
    //     this.router.navigate(['/admin/products']);
    //   });
    // }
  }
}
