import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Model/customer.model';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalCost: number = 0;
  cartItems: any[] = [];
  customer: Customer = {
    name: '',
    address: '',
    email: '',
    phone: '',
    date: new Date(),
    time:'',
  };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.cartService.currentCartTotal.subscribe((total) => {
      this.totalCost = total;
    });
  }

  removeFromCart(index: number) {
    this.cartService.removeItemFromCart(index); // Remove the item
    this.cartService.updateCartTotal(this.totalCost); // Update the total cost
  }

  checkout() {

    console.log('Proceeding to checkout');
  }
}
