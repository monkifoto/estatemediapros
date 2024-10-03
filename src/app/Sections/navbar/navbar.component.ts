import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartTotal: number = 0;  // Variable to hold the total cost
  menuOpen: boolean = false;
  dropdownOpen: boolean = false;  // Manage dropdown visibility
  isLoggedIn: boolean = false;  // Track login status
  showVideoandTour: boolean = false;

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to the total cost observable from the cart service
    this.cartService.currentCartTotal.subscribe(total => {
      this.cartTotal = total;
    });

    this.authService.isLoggedIn().subscribe(isLogged => {
      this.isLoggedIn = isLogged;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout();  // Trigger logout
    this.isLoggedIn = false;  // Update login status
    this.closeMenu();  // Close the menu after logging out
  }
}
