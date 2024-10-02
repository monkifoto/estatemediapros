import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/Services/order.service';
import { Order } from 'src/app/Model/order.model';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
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

  ngOnInit(): void {
    // Get orderId from route parameters
    this.orderId = this.route.snapshot.paramMap.get('id') || '';

    // Initialize form
    this.orderForm = this.formBuilder.group({
      comments: ['', Validators.required],
      tourLink: ['', Validators.required],
      videoLink: ['', Validators.required],
    });

    // Load order details
    if (this.orderId) {
      this.orderService.getOrderById(this.orderId).subscribe(order => {
        this.order = order;
        this.orderForm.patchValue({
          comments: order.comments || '',
          tourLink: order.tourLink || '',
          videoLink: order.videoLink || ''
        });
      });
    }
  }

  // Save updated order data
  saveOrder(): void {
    const updatedOrder = {
      ...this.order,
      comments: this.orderForm.value.comments,
      tourLink: this.orderForm.value.tourLink,
      videoLink: this.orderForm.value.videoLink
    };

    this.orderService.updateOrder(this.orderId, updatedOrder).then(() => {
      this.router.navigate(['/admin/order-list']);
    });
  }
}
