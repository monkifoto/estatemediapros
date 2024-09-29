import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private emailUrl: string = 'https://us-central1-pacificpropertyphotos-50a8c.cloudfunctions.net/sendContactEmail';

  constructor(private firestore: AngularFirestore, private http: HttpClient) {}

  // Save order to Firestore
  saveOrder(order: any): Promise<any> {
    return this.firestore.collection('Orders').add(order);
  }

  // Send email with order details
  sendOrderEmail(order: any): Observable<any> {
    return this.http.post(this.emailUrl, order, { responseType: 'text' });
  }
}
