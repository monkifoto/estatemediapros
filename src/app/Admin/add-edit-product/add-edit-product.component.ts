import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { ProductService } from 'src/app/Services/product.service';
import { EMPTY, from, Observable, switchMap } from 'rxjs';

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
    detailedDescription: '',
    imageUrl: '',
    detailThumbnails: [], // Add thumbnails property
    baseSqFt: 0,
    basePrice: 0,
    priceIncrementPerSqFt: 0,
    incrementSqFtStep: 0,
    price: 0,
    productType: '',
    isDetailsVisible: false,
    isActive: true,
    isPromotion: false,
    promotionDiscount: 0,
    sort:0
  };

  editingProduct: boolean = false;
  private productIdCounter: number = 0; // Counter for generating incremental product IDs

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.editingProduct = true;
      this.loadProduct(productId);
    }
    //  else {
    //   this.generateProductId(); // Generate new product ID when adding
    // }
  }

  // Load product by ID for editing
  loadProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
          console.log('Product loaded:', this.product);
        } else {
          console.error('Product not found');
        }
      },
      error: (error: any) => {
        console.error('Error loading product:', error);
      }
    });
  }

  // Handle file input for thumbnail uploads
  onFileChange(event: any) {
    const files = event.target.files;
    this.product.detailThumbnails = []; // Clear existing thumbnails

    for (let i = 0; i < files.length && i < 3; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.detailThumbnails?.push(e.target.result); // Store thumbnail as base64
      };
      reader.readAsDataURL(file); // Read file as base64
    }
  }

  // Generate a new product ID
  // generateProductId() {
  //   this.productIdCounter++; // Increment product ID counter
  //   this.product.id = String(this.productIdCounter).padStart(3, '0'); // Format ID to three digits
  // }

  onSubmit() {
    const productObservable = this.editingProduct
        ? this.productService.checkProductExists(this.product.id).pipe(
            switchMap(exists => {
                if (exists) {
                    return this.productService.updateProduct(this.product);
                }else {
                  console.error('Product does not exist for update:', this.product.id);
                  // If the product doesn't exist, we add it instead of returning EMPTY
                  return this.productService.addProduct({ ...this.product, id: this.product.id }); // Add the product
              }
            })
        )
        : this.productService.addProduct(this.product);

    // Subscribe to the Observable
    productObservable.subscribe({
        next: () => {
            this.router.navigate(['/admin/products']);
        },
        error: (error: any) => {
            console.error('Error saving product:', error);
        }
    });
}


}
