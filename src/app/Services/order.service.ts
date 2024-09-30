import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private emailUrl: string = 'https://us-central1-pacificpropertyphotos-50a8c.cloudfunctions.net/sendOrderEmail';

  constructor(private firestore: AngularFirestore, private http: HttpClient) {}

  private ordersCollection = this.firestore.collection('Orders');


  // Fetch all orders from Firestore
  getOrders(): Observable<any[]> {
    return this.ordersCollection.valueChanges({ idField: 'id' });
  }

  updateOrderStatus(orderId: string, status: string): Promise<void> {
    return this.ordersCollection.doc(orderId).update({ status });
  }

  markOrderAsDeleted(orderId: string): Promise<void> {
    return this.updateOrderStatus(orderId, 'Deleted');
  }

  markOrderAsCompleted(orderId: string): Promise<void> {
    return this.updateOrderStatus(orderId, 'Completed');
  }

  // Save order to Firestore
  saveOrder(order: any): Promise<any> {
    return this.ordersCollection.add(order);
  }

  // Send email with order details
  sendOrderEmail(order: any): Observable<any> {
    console.log("Email Url: " + this.emailUrl);
    console.log("Sent Order Email Order:" + order);
    return this.http.post(this.emailUrl, order, { responseType: 'text' });

  }
}
