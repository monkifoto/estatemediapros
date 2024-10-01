import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  constructor(private firestore: AngularFirestore) {}

  private subscribersCollection = this.firestore.collection('Subscribers');

  // Fetch all subscribers from Firestore
  getSubscribers(): Observable<any[]> {
    return this.subscribersCollection.valueChanges({ idField: 'id' });
  }
  // Method to add a new subscriber to Firestore
  subscribe(email: string): Promise<any> {
    const subscriber = { email, subscribedAt: new Date() };
    return this.subscribersCollection.add(subscriber);
  }
}
