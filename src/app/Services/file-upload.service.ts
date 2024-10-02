// src/app/Services/file-upload.service.ts

import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private storage: AngularFireStorage) {}

  uploadFile(file: File, orderId: string): Observable<string> {
    const filePath = `orders/${orderId}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    return uploadTask.snapshotChanges().pipe(
      finalize(() => {}),  // Finalize completes the upload
      switchMap(() => fileRef.getDownloadURL()) // Get download URL after upload completes
    );
  }

   // Fetch existing files for the order
   getFilesForOrder(orderId: string): Observable<{ name: string, url: string }[]> {
    const folderRef = this.storage.ref(`orders/${orderId}`);
    return folderRef.listAll().pipe(
      switchMap(result => {
        // Map the results into file name and download URL objects
        const fileObservables = result.items.map(item =>
          item.getDownloadURL().then(url => ({ name: item.name, url }))
        );
        return Promise.all(fileObservables);  // Wait for all URLs to be fetched
      })
    );
  }

  // Delete a file from Firebase storage
  deleteFile(fileName: string, orderId: string): Observable<void> {
    const fileRef = this.storage.ref(`orders/${orderId}/${fileName}`);
    return fileRef.delete();  // Delete the file from storage
  }
}
