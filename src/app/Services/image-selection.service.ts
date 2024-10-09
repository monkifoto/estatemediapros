// image-selection.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageSelectionService {
  private selectedImagesSource = new BehaviorSubject<string[]>([]);
  selectedImages$ = this.selectedImagesSource.asObservable();

  updateSelectedImages(images: string[]) {
    console.log("Selected Image count in service", images.length);
    this.selectedImagesSource.next(images);
  }
}
