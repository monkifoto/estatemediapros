import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    standalone: false
})
export class AdminComponent {
  activeTab: string = 'orders';
  isSidebarCollapsed = false;
  activeSection: string = 'orders'; // Default section

  constructor(private authService: AuthService, private router: Router) {}

  // Function to switch between sections
  setActiveSection(section: string) {
    this.activeSection = section;
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']); // Redirect to login after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  addProduct() {
    this.activeTab = 'addProduct';
  }
}
