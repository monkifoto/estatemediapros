import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private storage = getStorage(); // Initialize Firebase storage instance

  constructor() {}

  // Upload a file and return an Observable with the download URL
  uploadFile(file: File, orderId: string): Observable<string> {
    const filePath = `orders/${orderId}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Observable<string>((observer) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => observer.error(error), // Handle error
        async () => {
          try {
            const downloadURL = await getDownloadURL(fileRef);
            observer.next(downloadURL);
            observer.complete();
          } catch (error) {
            observer.error(error);
          }
        }
      );
    });
  }

  // Fetch existing files for the order
  getFilesForOrder(orderId: string): Observable<{ name: string; url: string }[]> {
    const folderRef = ref(this.storage, `orders/${orderId}`);

    return from(listAll(folderRef)).pipe(
      switchMap(async (result) => {
        const filePromises = result.items.map(async (item) => ({
          name: item.name,
          url: await getDownloadURL(item),
        }));
        return Promise.all(filePromises); // Wait for all download URLs
      })
    );
  }

  // Delete a file from Firebase storage
  deleteFile(fileName: string, orderId: string): Observable<void> {
    const fileRef = ref(this.storage, `orders/${orderId}/${fileName}`);
    return from(deleteObject(fileRef));
  }
}
