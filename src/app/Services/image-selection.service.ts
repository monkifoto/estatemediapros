import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageSelectionService {
  private selectedImagesSource = new BehaviorSubject<string[]>([]);
  selectedImages$ = this.selectedImagesSource.asObservable();
  private storage = getStorage(); // Firebase storage instance

  // Method to fetch image URLs from Firebase Storage
  fetchImageUrls(folderPath: string): Observable<string[]> {
    const storageRef = ref(this.storage, folderPath);
    return from(listAll(storageRef)).pipe(
      switchMap((result) => {
        // Get download URLs for all items in the folder
        const downloadUrlPromises = result.items.map(item => getDownloadURL(item));
        return from(Promise.all(downloadUrlPromises));
      })
    );
  }

  updateSelectedImages(images: string[]) {
    console.log("Selected Image count in service", images.length);
    this.selectedImagesSource.next(images);
  }
}
