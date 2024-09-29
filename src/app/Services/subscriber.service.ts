import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private collectionName = 'Subscribers';

  constructor(private firestore: AngularFirestore) {}

  // Method to add a new subscriber to Firestore
  subscribe(email: string): Promise<any> {
    const subscriber = { email, subscribedAt: new Date() };
    return this.firestore.collection(this.collectionName).add(subscriber);
  }
}
