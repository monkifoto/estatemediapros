import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/Services/order.service';
import { Order } from 'src/app/Model/order.model';

@Component({
    selector: 'app-order-edit',
    templateUrl: './order-edit.component.html',
    styleUrls: ['./order-edit.component.css'],
    standalone: false
})
export class OrderEditComponent implements OnInit {
  orderForm!: FormGroup;
  orderId!: string;
  order!: Order;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';

    // Initialize form with default values
    this.orderForm = this.formBuilder.group({
      comments: [''],
      tourLink: [''],
      videoLink: [''],
      MLStourLink: [''],
      MLSvideoLink: ['']
    });

    if (!this.orderId) return;

    try {
      const order = await this.orderService.getOrderById(this.orderId).toPromise();
      if (order) {
        this.order = order;
        this.orderForm.setValue({
          comments: order.comments || '',
          tourLink: order.tourLink || '',
          videoLink: order.videoLink || '',
          MLStourLink: order.MLStourLink || '',
          MLSvideoLink: order.MLSvideoLink || ''
        });
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  }

  async saveOrder(): Promise<void> {
    if (!this.orderId || !this.order) return;

    const updatedOrder: Partial<Order> = {
      ...this.order,
      ...this.orderForm.value
    };

    try {
      await this.orderService.updateOrder(this.orderId, updatedOrder);
      this.router.navigate(['/admin/order-list']);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  }
}
