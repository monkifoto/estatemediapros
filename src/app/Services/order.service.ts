import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, getDoc, collectionData, query, where } from '@angular/fire/firestore';
import { Storage, ref, listAll, getDownloadURL, ListResult } from '@angular/fire/storage';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable, switchMap } from 'rxjs';
import { Order } from '../Model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private firestore: Firestore = inject(Firestore);
  private storage: Storage = inject(Storage);

  private emailUrl: string =
    'https://us-central1-pacificpropertyphotos-50a8c.cloudfunctions.net/sendOrderEmail';

  private ordersCollection = collection(this.firestore, 'Orders');  // Firestore collection reference

  orderId: string = '33L4evImBNnr4pZG6SGj';

  constructor(private http: HttpClient) {}

  // Fetch all orders from Firestore
  getOrders(): Observable<Order[]> {
    return collectionData(this.ordersCollection, { idField: 'id' }).pipe(
      map((orders: any[]) => // Use 'any' for the document data as it's coming from Firestore
        orders.map((order: any) => ({
          ...order,
          cartContents: order.cartContents || [], // Ensure cartContents is an array
          customerInfo: order.customerInfo || {}, // Ensure customerInfo is an object
          comments: order.comments || '',
          tourLink: order.tourLink || '',
          videoLink: order.videoLink || '',
          MLStourLink: order.MLStourLink || '',
          MLSvideoLink: order.MLSvideoLink || '',
          squareFootage: order.squareFootage || ''
        }))
      )
    );
  }
  updateOrderStatus(orderId: string, status: string): Promise<void> {
    const orderDoc = doc(this.firestore, `Orders/${orderId}`);
    return updateDoc(orderDoc, { status });
  }

  markOrderAsDeleted(orderId: string): Promise<void> {
    return this.updateOrderStatus(orderId, 'Deleted');
  }

  markOrderAsCompleted(orderId: string): Promise<void> {
    return this.updateOrderStatus(orderId, 'Completed');
  }

  // Save order to Firestore
  saveOrder(order: Order): Promise<any> {
    return addDoc(this.ordersCollection, order);
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
  const orderDocRef = doc(this.firestore, `Orders/${orderId}`); // Reference to the Firestore document

  // Convert the promise to an observable
  return from(getDoc(orderDocRef)).pipe(
    map((orderDocSnapshot) => {
      // Check if the document exists and then map the data
      if (orderDocSnapshot.exists()) {
        return orderDocSnapshot.data() as Order;
      } else {
        throw new Error('Order not found');
      }
    })
  );
}
  updateOrder(orderId: string, orderData: any): Promise<void> {
    const orderDoc = doc(this.firestore, `Orders/${orderId}`);
    return updateDoc(orderDoc, orderData);
  }

  //////// Experimental //////

  loadGalleryImages(): Observable<string[]> {
    const folderPath = `orders/${this.orderId}`;
    const storageRef = ref(this.storage, folderPath); // Firebase storage reference

    // Return an Observable by wrapping the promise from `listAll`
    return from(listAll(storageRef)).pipe(
      switchMap((result: ListResult) => {
        // Ensure that result.items has the correct type
        const downloadUrlPromises = result.items.map(item => getDownloadURL(item));

        // Wait for all promises to resolve, then return the observable of the resulting URLs
        return from(Promise.all(downloadUrlPromises));
      })
    );
  }
}
