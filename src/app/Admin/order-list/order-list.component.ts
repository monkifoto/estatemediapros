import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  filteredOrderList: any[] = []; // Store the filtered orders
  showDeletedOrders: boolean = false; // Track checkbox state



  constructor(private orderService: OrderService, private router: Router, private cdr: ChangeDetectorRef) {}



  ngOnInit(): void {
    // Fetch orders when the component is initialized
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
        this.updateFilteredOrders(); // Update filtered orders
        this.cdr.detectChanges(); // Trigger change detection
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // Method to update the filteredOrderList based on the checkbox value
  updateFilteredOrders() {
    if (this.showDeletedOrders) {
      this.filteredOrderList = this.orders; // Show all orders
    } else {
      this.filteredOrderList = this.orders.filter(order => order.status !== 'Deleted'); // Hide deleted orders
    }
  }

  markAsCompleted(orderId: string) {
    this.orderService.markOrderAsCompleted(orderId).then(() => {
      console.log('Order marked as completed.');
      this.updateFilteredOrders(); // Update filtered orders
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  markAsDeleted(orderId: string) {
    this.orderService.markOrderAsDeleted(orderId).then(() => {
      console.log('Order marked as deleted.');
      this.updateFilteredOrders(); // Update filtered orders
      this.cdr.detectChanges(); // Trigger change detection
    });
  }
  navigateToGallery(orderId: string) {
    // Navigate to the gallery view for this order
    window.open(`/gallery/${orderId}`, '_blank');
  }

  navigateToFileUpload(orderId: string) {
    // Use the router to navigate to the file upload component with the orderId
    this.router.navigate([`/admin/upload-files/${orderId}`]);
  }

  navigateToEditOrder(orderId: string): void {
    this.router.navigate([`/admin/edit-order/${orderId}`]);
  }

}
