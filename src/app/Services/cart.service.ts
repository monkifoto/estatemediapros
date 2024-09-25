import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../Model/customer.model';
import { Product } from '../Model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];
  private cartTotalSource = new BehaviorSubject<number>(0); // Holds the current cart total
  currentCartTotal = this.cartTotalSource.asObservable(); // Observable for cart total changes

  private cartItemsSource = new BehaviorSubject<any[]>([]); // Holds cart items
  currentCartItems = this.cartItemsSource.asObservable(); // Observable for cart items changes

  constructor() {}

  addCustomerInfo(cust: Customer, sqft: any) {
    const order = {
      customer: cust,
      squareFootage: sqft,
      products: this.cart,
      total: this.getTotal(),
      date: new Date(),
    };
  }

  getCartItems() {
    return this.cart;
  }


  addProduct(product: Product) {
    this.cart.push(product);
    const currentItems = [...this.cartItemsSource.value, product];
    this.cartItemsSource.next(currentItems);
    this.updateCartTotal(this.calculateTotal(currentItems)); // Recalculate total
  }


  // Updates the total cost of the cart
  updateCartTotal(newTotal: number): void {
    this.cartTotalSource.next(newTotal);
  }

  // Removes an item from the cart by index
  removeItemFromCart(index: number): void {
    const currentItems = [...this.cartItemsSource.value];
    if (index > -1) {
      currentItems.splice(index, 1); // Remove the item from the array
      this.cart.splice(index,1);
      this.cartItemsSource.next(currentItems);
      this.updateCartTotal(this.calculateTotal(currentItems)); // Recalculate total
    }
  }

  // Calculates total cost of the cart items
  private calculateTotal(items: any[]): number {
    return items.reduce((total, item) => total + item.price, 0);
  }

  // Calculate the total price of the cart
  getTotal() {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }



}
