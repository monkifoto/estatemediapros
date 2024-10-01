import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];


  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    // Fetch orders when the component is initialized
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
        console.log ("Orders list Data: ", data);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }


  markAsCompleted(orderId: string) {
    this.orderService.markOrderAsCompleted(orderId).then(() => {
      console.log('Order marked as completed.');
    });
  }

  markAsDeleted(orderId: string) {
    this.orderService.markOrderAsDeleted(orderId).then(() => {
      console.log('Order marked as deleted.');
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

}
