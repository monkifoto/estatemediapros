import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent {
  activeTab: string = 'bundles';
  squareFootage: { min: number; max: number } = { min: 2000, max: 3000 };
  selectedSqFt: number = 2000;
  product: any;
  products!: Product[];
  productsPhotos!: Product[];
  orderForm!: FormGroup;
  showCustomerInfo: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public productService: ProductService,
    public cartService: CartService
  ) {
    this.orderForm = this.fb.group({
      Name: ['Alex Bucse '],
      Address: ['15325 SE 155th Pl Unit E2, Renton Wa 980058'],
      Email: ['seattlerealestatephoto@gmail.com'],
      PhoneNumber: ['425 390 4204'],
      Date: ['10/01/2024'],
      Time: ['5pm'],
    });
  }
  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  onSqftChange(min: number, max: number) {
    console.log('On Sqft change - ' + 'Min: ' + min + 'Max: ' + max);
    this.squareFootage = { min, max };
    this.updatePrices();
  }

  updatePrices(): void {
    this.products.forEach((product: Product) => {
      product.price = this.getTotalPrice(
        product,
        this.squareFootage.min,
        this.squareFootage.max
      );
    });
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

      console.log('Order:', order);
    } else {
      console.log('Form is not valid.');
    }
  }

  onBookNow() {
    this.showCustomerInfo = true; // Show the customer info form
  }
}
