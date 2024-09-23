import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  addProduct(product: any) {
    this.cart.push(product);
  }

  getCartItems() {
    return this.cart;
  }
  private cartTotalSource = new BehaviorSubject<number>(0);  // Holds the current cart total
  currentCartTotal = this.cartTotalSource.asObservable();    // Observable for cart total changes

  private cartItemsSource = new BehaviorSubject<any[]>([]);  // Holds cart items
  currentCartItems = this.cartItemsSource.asObservable();    // Observable for cart items changes

  constructor() {}

  // Updates the total cost of the cart
  updateCartTotal(newTotal: number): void {
    this.cartTotalSource.next(newTotal);
  }

  // Adds an item to the cart
  addItemToCart(item: any): void {
    const currentItems = [...this.cartItemsSource.value, item];
    this.cartItemsSource.next(currentItems);
    this.updateCartTotal(this.calculateTotal(currentItems));  // Recalculate total
  }

  // Removes an item from the cart by index
  removeItemFromCart(index: number): void {
    const currentItems = [...this.cartItemsSource.value];
    if (index > -1) {
      currentItems.splice(index, 1);  // Remove the item from the array
      this.cartItemsSource.next(currentItems);
      this.updateCartTotal(this.calculateTotal(currentItems));  // Recalculate total
    }
  }

  // Calculates total cost of the cart items
  private calculateTotal(items: any[]): number {
    return items.reduce((total, item) => total + item.price, 0);
  }
}
