import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, setDoc, docData } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  private firestore: Firestore = inject(Firestore);  // Inject Firestore from Firebase modular SDK

  constructor() {}

  private subscribersCollection = collection(this.firestore, 'Subscribers');  // Access 'Subscribers' collection

  // Fetch all subscribers from Firestore
  getSubscribers(): Observable<any[]> {
    return collectionData(this.subscribersCollection, { idField: 'id' });  // Get collection data with id field
  }

  getSubscriberById(id: string): Observable<any> {
    const subscriberDocRef = doc(this.firestore, `subscribers/${id}`);
    return docData(subscriberDocRef, { idField: 'id' });
  }

  // Method to add a new subscriber to Firestore
  subscribe(email: string): Promise<any> {
    const subscriber = { email, subscribedAt: new Date() };
    return addDoc(this.subscribersCollection, subscriber);  // Add new document to the collection
  }
}
