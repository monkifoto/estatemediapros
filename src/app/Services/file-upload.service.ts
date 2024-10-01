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
}
