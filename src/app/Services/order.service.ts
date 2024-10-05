import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable, switchMap } from 'rxjs';
import { Order } from '../Model/order.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersCollection = this.firestore.collection('Orders');
  private orderCollection!: AngularFirestoreCollection<Order>;
  orderId: string = '33L4evImBNnr4pZG6SGj';

  private emailUrl: string =
    'https://us-central1-pacificpropertyphotos-50a8c.cloudfunctions.net/sendOrderEmail';

  constructor(private firestore: AngularFirestore, private http: HttpClient, private storage: AngularFireStorage,) {
    this.orderCollection = this.firestore.collection<Order>('Orders');
  }

  // Fetch all orders from Firestore
  // getOrders(): Observable<any[]> {
  //   return this.ordersCollection.valueChanges({ idField: 'id' });
  // }

  getOrders(): Observable<Order[]> {
    return this.orderCollection.valueChanges({ idField: 'id' }).pipe(
      map((orders: Order[]) =>
        orders.map((order: Order) => ({
          ...order,
          cartContents: order.cartContents || [],
          customerInfo: order.customerInfo || {},
        }))
      )
    );
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
  saveOrder(order: Order): Promise<any> {
    return this.ordersCollection.add(order);
  }

  // Send email with order details
  sendOrderEmail(order: any): Observable<any> {
    console.log('Email Url: ' + this.emailUrl);
    console.log('Sent Order Email Order:' + order);
    return this.http.post(this.emailUrl, order, { responseType: 'text' });
  }

  // Fetch order by ID from Firestore
  getOrderById(orderId: string): Observable<Order> {
    console.log('getOrderById: ', orderId);
    return this.firestore
      .collection('Orders')
      .doc(orderId)
      .valueChanges()
      .pipe(
        map((orderData) => {
          return orderData as Order; // Explicitly map the data to the Order type
        })
      );
  }

  updateOrder(orderId: string, orderData: any): Promise<void> {
    return this.ordersCollection.doc(orderId).update(orderData);
  }

  ////////Experimental //////

  loadGalleryImages(): Observable<string[]> {
    const folderPath = `orders/${this.orderId}`;
    return this.storage.ref(folderPath).listAll().pipe(
      switchMap((result) => {
        // Create an array of promises to get download URLs
        const downloadUrlPromises = result.items.map(item => item.getDownloadURL());
        // Wait for all promises to resolve, then return the observable of the resulting URLs
        return from(Promise.all(downloadUrlPromises));
      })
    );
  }

}
