import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, query, where, setDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../Model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  // Get all active products
  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'Products');
    const q = query(productsRef, where('isActive', '==', true));

    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  // Get product by type
  getProductByType(type: string): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'Products');
    const q = query(productsRef, where('productType', '==', type));

    return collectionData(q, { idField: 'id' }).pipe(
      map((data) => data as Product[]), // ✅ Explicitly cast the data to Product[]
      catchError((error) => {
        console.error('Error fetching products by type:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
  // Add a product with Firestore-generated ID
  addProduct(product: Product): Observable<void> {
    const productRef = doc(collection(this.firestore, 'Products')); // Auto-generate ID
    return from(setDoc(productRef, { ...product, id: productRef.id }));
  }

  // Update an existing product
  updateProduct(product: Product): Observable<void> {
    if (!product.id) {
      throw new Error('Product ID is required for update');
    }
    const productRef = doc(this.firestore, `Products/${product.id}`);
    return from(updateDoc(productRef, { ...product }));
  }

  // Check if a product exists
  checkProductExists(productId: string): Observable<boolean> {
    const productRef = doc(this.firestore, `Products/${productId}`);
    return from(getDoc(productRef)).pipe(
      map(snapshot => snapshot.exists()),
      catchError(error => {
        console.error('Error checking product existence:', error);
        return of(false);
      })
    );
  }

  // Get product by ID
  getProductById(id: string): Observable<Product | undefined> {
    const productRef = doc(this.firestore, `Products/${id}`);
    return docData(productRef, { idField: 'id' }).pipe(
      map((product) => (product ? (product as Product) : undefined)), // ✅ Explicitly cast to Product
      catchError((error) => {
        console.error('Error fetching product:', error);
        return of(undefined);
      })
    );
  }
}
