import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  activeTab: string = 'photos';
  squareFootage: { min: number; max: number } = { min: 2000, max: 3000 };
  selectedSqFt: number = 2000; // Default square footage
  product: any; // Product object to store the details
  products!: Product[];
  productsPhotos!: Product[];
  orderForm!:FormGroup;

  constructor(private fb: FormBuilder,
     private route: ActivatedRoute,
     public productService: ProductService,
    public cartService: CartService
    ){
    this.orderForm = this.fb.group({
      Name: ['Alex Bucse '],
      Address: ['15325 SE 155th Pl Unit E2, Renton Wa 980058'],
      Email:['seattlerealestatephoto@gmail.com'],
      PhoneNumber: ['425 390 4204'],
      Date:['10/01/2024'],
      Time:['5pm']
    })
  }
  ngOnInit(): void {
    this.products =  this.productService.getProducts();
    // const productId = this.route.snapshot.paramMap.get('id')||''; // Get product ID from route
    // this.product = this.productService.getProductById(productId); // Fetch product details
  }

  // addToCart() {
  //   // Logic to add the product to the cart
  //   console.log(`Product ${this.product.name} added to cart.`);
  // }


  onSqftChange(min: number, max: number) {
    // Store the selected square footage range
    console.log("On Sqft change - " + "Min: " + min + "Max: " + max);
    this.squareFootage = { min, max };
    this.updatePrices();
  }

    // Update prices based on the selected square footage range
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

      // Check if selected sq ft is within base sq ft range or higher
      if (minSqFt <= baseSqFt) {
        return product.basePrice; // If within base range, use the base price
      }

      // Calculate increments based on the selected square footage range
      const extraSqFt = minSqFt - baseSqFt;
      const increments = Math.ceil(extraSqFt / priceIncrementStep); // Number of increments based on selected sq ft

      // Return the total price (base + increments)
      return product.basePrice + increments * priceIncrementPerStep;
    }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const order = {
        customerInfo: this.orderForm.value,
        squareFootage: this.selectedSqFt,
        cartContents: this.cartService.getCartItems() // Assuming you have a cart service
      };

      console.log('Order:', order);
      // Submit the order object to your backend or handle it accordingly
    } else {
      console.log('Form is not valid.');
    }
  }
}
