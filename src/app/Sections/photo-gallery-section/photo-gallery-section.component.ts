import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-photo-gallery-section',
  imports: [CommonModule],
  templateUrl: './photo-gallery-section.component.html',
  styleUrl: './photo-gallery-section.component.css'
})
export class PhotoGallerySectionComponent {
  modalImage: string | null = null;

  photoGallery = [
    './../../../assets/photos/_MKY1150ENFUSE-Edit-Edit.jpg',
    './../../../assets/photos/7R308443.jpg',
    './../../../assets/photos/7R308428.jpg'
  ];

  aerialGallery = [
    './../../../assets/aerial/DJI_0049ENFUSE-Edit.jpg',
    './../../../assets/aerial/DJI_0193.jpg',
    './../../../assets/aerial/DJI_0233.jpg'
  ];

  openModal(image: string): void {
    this.modalImage = image;
  }

  closeModal(): void {
    this.modalImage = null;
  }
}
