import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { Product } from '../Model/product.model';
import { Customer } from '../Model/customer.model';

@Component({
  selector: 'app-shopping-section',
  templateUrl: './shopping-section.component.html',
  styleUrls: ['./shopping-section.component.css'],
})
export class ShoppingSectionComponent implements OnInit {
  squareFootage: { min: number; max: number } = { min: 2000, max: 3000 };
  selectedSqFt: number = 2000; // Default square footage
  totalCost: number = 0;
  cart: any[] = [];

  // Customer Information
  customer: Customer = {
    name: '',
    address: '',
    email: '',
    phone: '',
    date: new Date(),
    time:'',
  };

  // Available products with base prices
  products: Product[] = [
    {
      id: '001',
      name: 'Basic Photography',
      description: 'High-quality basic photography for real estate listings.',
      imageUrl: '/assets/photo-basic.jpg',
      baseSqFt: 2000,
      basePrice: 150,
      priceIncrementPerSqFt: 50, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
    },
    {
      id: '002',
      name: 'Video Tour',
      description: 'Professional video tour for real estate.',
      imageUrl: '/assets/video-tour.jpg',
      baseSqFt: 2000,
      basePrice: 200,
      priceIncrementPerSqFt: 100, // $100 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
    },
    {
      id: '003',
      name: '3D Tour',
      description: 'High-quality Matterport Tour for real estate listings.',
      imageUrl: '/assets/photo-basic.jpg',
      baseSqFt: 2000,
      basePrice: 150,
      priceIncrementPerSqFt: 50, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
    },
    {
      id: '004',
      name: 'Floor Plans',
      description: 'High-quality Floor Plan real estate listings.',
      imageUrl: '/assets/photo-basic.jpg',
      baseSqFt: 2000,
      basePrice: 70,
      priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
    },
    // Add other products as needed
  ];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to cart items
    this.cartService.currentCartItems.subscribe((items) => {
      this.cart = items;
    });

    // Subscribe to the total cost
    this.cartService.currentCartTotal.subscribe((total) => {
      this.totalCost = total;
    });
  }

  // Handle square footage changes
  onSqftChange(min: number, max: number) {
    // Store the selected square footage range
    this.squareFootage = { min, max };
    this.updatePrices();
  }

  // Update prices based on the selected square footage range
  updatePrices(): void {
    this.products.forEach((product) => {
      product.price = this.getTotalPrice(
        product,
        this.squareFootage.min,
        this.squareFootage.max
      );
    });
  }
  getPriceDifference(product: Product): number {
    const pricePerSqFt = product.basePrice / product.baseSqFt;
    return (this.selectedSqFt - product.baseSqFt) * pricePerSqFt;
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

  // getTotalPrice(product: Product, min: number, max: number): number {
  //   const extraSqFt = this.selectedSqFt - product.baseSqFt;
  //   const increments = Math.ceil(extraSqFt / product.incrementSqFtStep);
  //   return product.basePrice + (increments * product.priceIncrementPerSqFt);
  // }

  // Calculate price based on square footage
  calculatePrice(product: any): number {
    let basePrice = product.basePrice;

    if (this.selectedSqFt > product.baseSqFt) {
      const extraSqFt = this.selectedSqFt - product.baseSqFt;
      const increments = Math.ceil(extraSqFt / product.incrementSqFtStep);
      basePrice += increments * product.priceIncrementPerSqFt;
    }

    return basePrice;
  }

  // Add item to cart with the calculated price
  onAddToCart(product: any) {
    const cartItem = {
      ...product,
      price: product.price, // Use the updated price from product.price
    };
    this.cartService.addItemToCart(cartItem); // Add the item to the cart using the service
  }

  removeFromCart(index: number) {
    this.cartService.removeItemFromCart(index); // Remove the item
    this.updateTotalCost(); // Update the total cost
  }

  updateTotalCost() {
    this.totalCost = this.cart.reduce((acc, item) => acc + item.price, 0); // Sum of all item prices
  }

  // Calculate the total price of the cart
  getTotal() {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

  // Handle checkout and save order details (e.g., to Firebase)
  checkout() {
    const order = {
      customer: this.customer,
      squareFootage: this.squareFootage,
      products: this.cart,
      total: this.getTotal(),
      date: new Date(),
    };

    // Save order logic here
  }

  // Reset cart after checkout
  resetCart() {
    this.cart = [];
    this.customer = {
      name: '',
      address: '',
      email: '',
      phone: '',
      date: new Date(),
      time: ''
    };
  }
}
