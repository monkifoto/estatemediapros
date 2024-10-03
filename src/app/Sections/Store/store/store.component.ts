import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { OrderService } from './../../../Services/order.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  activeTab: string = 'bundles';
  squareFootage: { min: number; max: number } = { min: 500, max: 1000 };
  selectedSqFt: string = '500-1000';
  product: any;
  products!: Product[];
  productsPhotos!: Product[];
  orderForm!: FormGroup;
  showCustomerInfo: boolean = false;
  showVideoandTour: boolean = false;

  // Modal properties
  showModal: boolean = false;
  selectedProduct: Product | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public productService: ProductService,
    public cartService: CartService,
    public orderService: OrderService,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    this.orderForm = this.fb.group({
      Name: ['Customer Name'],
      Address: ['15325 SE 155th Pl Unit E2, Renton Wa 980058'],
      Email: ['seattlerealestatephoto@gmail.com',[Validators.required, Validators.email]],
      PhoneNumber: ['425 390 4204'],
      Date: ['10/01/2024'],
      Time: ['5 : 00 PM'],
      bestFeature: [''],
      propertyAccess: [''],
      liveDate: [''],
      garageAdu: [false]
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        console.log('Products fetched successfully:', this.products);

        // After fetching products, update the prices
        this.updatePrices();

        setTimeout(() => {
          this.activeTab = 'photos';
          this.cdRef.detectChanges();
        }, 0);
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  onSqftChange(min: number, max: number) {
    console.log('On Sqft change - ' + 'Min: ' + min + 'Max: ' + max);
    this.squareFootage = { min, max };
    this.updatePrices();
  }

  updatePrices(): void {
    if (this.products && this.products.length > 0) { // Ensure products are available
      this.products.forEach((product: Product) => {
        product.price = this.getTotalPrice(
          product,
          this.squareFootage.min,
          this.squareFootage.max
        );
      });
      this.cartService.updateCartItems(this.products.filter(p => this.cartService.getCartItems().some(cartItem => cartItem.id === p.id)));
    } else {
      console.error('No products available to update prices.');
    }
  }

  getTotalPrice(product: Product, minSqFt: number, maxSqFt: number): number {
    const baseSqFt = product.baseSqFt;
    const priceIncrementStep = product.incrementSqFtStep;
    const priceIncrementPerStep = product.priceIncrementPerSqFt;
    if (minSqFt <= baseSqFt) {
      return product.basePrice;
    }
    const extraSqFt = minSqFt - baseSqFt;
    const increments = Math.ceil(extraSqFt / priceIncrementStep);
    return product.basePrice + increments * priceIncrementPerStep;
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const order = {
        customerInfo: this.orderForm.value,
        squareFootage: this.selectedSqFt,
        cartContents: this.cartService.getCartItems(),
      };

      console.log('Order has been submitted:', order);

      // 1. Save the order in Firestore
      this.orderService.saveOrder(order).then(() => {
        console.log('Order saved in Firestore successfully.');

        // 2. Send email with order details
        this.orderService.sendOrderEmail(order).subscribe(
          (response: any) => {
            console.log('Order email sent successfully:', response);
          },
          (error: any) => {
            console.error('Error sending order email:', error);
          }
        );
      }).catch((error: any) => {
        console.error('Error saving order in Firestore:', error);
      });

    } else {
      console.log('Form is not valid.');
    }
  }

  onBookNow() {
    this.showCustomerInfo = true; // Show the customer info form
  }

  // Function to open the modal and set the selected product
  openModal(product: Product): void {
    this.selectedProduct = product;
    this.showModal = true;
  }

  // Function to close the modal
  closeModal(): void {
    this.showModal = false;
    this.selectedProduct = null;
  }
}
