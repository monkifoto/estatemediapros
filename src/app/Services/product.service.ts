import { Injectable } from '@angular/core';
import { Product } from '../Model/product.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, from, map, Observable, of, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [];

  constructor(private firestore: AngularFirestore) {}

  getProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>('Products', ref => ref.where('isActive', '==', true)).valueChanges().pipe(
      tap(products => console.log('Fetched active products from Firestore:', products)),
      catchError(error => {
        console.error('Error fetching products from Firestore:', error);
        return throwError(error); // Handle error
      })
    );
  }

  // getProductById(id: string): Product | undefined {
  //   return this.products.find(product => product.id === id);
  // }

  // getProductByType(type: string): Product[] {
  //   return this.products.filter(product => product.productType === type);
  // }
  getProductByType(type: string): Observable<Product[]> {
    return this.firestore.collection<Product>('Products', ref => ref.where('productType', '==', type))
      .valueChanges()
      .pipe(
        catchError(error => {
          console.error('Error fetching products by type:', error);
          return of([]); // Return an empty array if an error occurs
        })
      );
  }

  addProduct(product: Product): Observable<void> {
    const productRef = this.firestore.collection('Products').doc(); // Firestore auto-generates an ID
    const productId = productRef.ref.id; // Use Firestore's auto-generated ID
    console.log(`Adding product with Firestore ID: ${productId}`);

    return from(
      productRef.set({ ...product, id: productId })
    ).pipe(
      tap(() => console.log(`Product with Firestore ID: ${productId} added successfully.`)),
      catchError(error => {
        console.error('Error adding product:', error);
        return throwError(error);
      })
    );
  }

  updateProduct(product: Product): Observable<void> {
    // Ensure the product has an ID before trying to update it
    if (!product.id) {
      throw new Error('Product ID is required for update');
    }

    // Use the from operator to convert the Promise to an Observable
    return from(this.firestore.collection('Products').doc(product.id).update(product));
  }

   // Function to check if a product exists
   public checkProductExists(productId: string): Observable<boolean> {
    return this.firestore.collection('Products').doc(productId).get().pipe(
        map(doc => {
            const exists = doc.exists;
            console.log(`Checking existence for product ID ${productId}:`, exists);
            return exists; // Return true or false based on existence
        }),
        catchError((error) => {
            console.error(`Error checking existence of product ${productId}:`, error);
            return of(false); // Return false in case of error
        })
    );
}

//  // Get a product by ID
//   getProductById(id: string) {
//     // Assuming you want to return an observable of the product
//     return this.firestore.collection('Products').doc<Product>(id).valueChanges();
//   }

getProductById(id: string): Observable<Product | undefined> {
  return this.firestore.collection('Products').doc<Product>(id).valueChanges().pipe(
    map(product => {
      if (product) {
        return product;
      } else {
        console.warn(`No product found with ID ${id}`);
        return undefined; // Return undefined if the product is not found
      }
    }),
    catchError(error => {
      console.error('Error fetching product:', error);
      return of(undefined); // Return undefined in case of error
    })
  );
}


}
