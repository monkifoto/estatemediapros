import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartTotal: number = 0;  // Variable to hold the total cost
  menuOpen: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to the total cost observable from the cart service
    this.cartService.currentCartTotal.subscribe(total => {
      this.cartTotal = total;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
