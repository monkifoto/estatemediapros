import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartTotal: number = 0;  // Variable to hold the total cost

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to the total cost observable from the cart service
    this.cartService.currentCartTotal.subscribe(total => {
      this.cartTotal = total;
    });
  }
}
