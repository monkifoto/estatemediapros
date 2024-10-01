import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  activeTab: string = 'products';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  activeSection: string = 'products';  // Default section

  // Function to switch between sections
  setActiveSection(section: string) {
    this.activeSection = section;
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  addProduct() {
    this.activeTab = 'addProduct';
  }
}
