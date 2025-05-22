import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-photo-gallery-section',
  imports: [CommonModule],
  templateUrl: './photo-gallery-section.component.html',
  styleUrl: './photo-gallery-section.component.css',
  standalone: true,
})
export class PhotoGallerySectionComponent {
  // modalImage: string | null = null;
  modalImageIndex: number | null = null;
  photoGallery = [
    './../../../assets/photos/_MKY1150ENFUSE-Edit-Edit.jpg',
    './../../../assets/photos/7R308443.jpg',
    './../../../assets/photos/7R308428.jpg',
    './../../../assets/photos/DJI_0061.jpg',
    './../../../assets/photos/A7400613.jpg',
    './../../../assets/photos/MKY04136-HDR-HDR-Edit.jpg',
    './../../../assets/photos/A7403377.jpg',
    './../../../assets/photos/A7400582 2.jpg',
    './../../../assets/photos/A7400551 2.jpg',
    './../../../assets/photos/A7403519.jpg',
    './../../../assets/photos/A7403404.jpg',
    './../../../assets/photos/A7403136.jpg',
    './../../../assets/photos/A7403365.jpg',
    './../../../assets/photos/A7403371.jpg',
    './../../../assets/photos/A7402071.jpg',
    './../../../assets/photos/A7403454.jpg',
    './../../../assets/photos/XT506670.jpg',
    './../../../assets/photos/XT506664.jpg',
    './../../../assets/photos/A7403288.jpg',
    './../../../assets/photos/A7403500.jpg',
    './../../../assets/photos/_MKY0525ENFUSE.jpg',
    './../../../assets/photos/A7409959.jpg',
    './../../../assets/photos/7R308733.jpg',
    './../../../assets/photos/A7407328a.jpg',
    './../../../assets/photos/A7400076.jpg',
    './../../../assets/photos/MKI07238ENFUSE-Edit.jpg',
    './../../../assets/photos/DJI_0417ENFUSE-Edit.jpg',
    './../../../assets/photos/MKI07298ENFUSE-Edit.jpg',
    './../../../assets/photos/A7400091.jpg',
    './../../../assets/photos/A7407318a-Edit.jpg',
    './../../../assets/photos/A7400582.jpg',
    './../../../assets/photos/A7400551.jpg',
    './../../../assets/photos/A7401784.jpg',
    './../../../assets/photos/7R308662.jpg',
    './../../../assets/photos/7R308443.jpg',
    './../../../assets/photos/7R308428.jpg',
    './../../../assets/photos/7R308653.jpg',
    './../../../assets/photos/7R308634.jpg',
    './../../../assets/photos/A7401815.jpg',
    './../../../assets/photos/A7401936.jpg',
    './../../../assets/photos/A7401692.jpg',
    './../../../assets/photos/7R308466.jpg',
    './../../../assets/photos/7R308601.jpg',
  ];

  aerialGallery = [
    './../../../assets/aerial/DJI_0049ENFUSE-Edit.jpg',
    './../../../assets/aerial/DJI_0193.jpg',
    './../../../assets/aerial/DJI_0233.jpg',
    './../../../assets/aerial/DJI_0281.jpg',
    './../../../assets/aerial/DJI_0318.jpg',
    './../../../assets/aerial/DJI_0432.jpg',
    './../../../assets/aerial/DJI_0548-Edit-Edit.jpg',
    './../../../assets/aerial/DJI_0549.jpg',
    './../../../assets/aerial/DJI_0559.jpg',
    './../../../assets/aerial/DJI_0568-Edit.jpg',
    './../../../assets/aerial/DJI_0613-Edit.jpg',
    './../../../assets/aerial/DJI_0668-Edit.jpg',
    './../../../assets/aerial/DJI_0713 DTE-Edit 2.jpg',
    './../../../assets/aerial/DJI_0713 DTE-Edit.jpg',
    './../../../assets/aerial/DJI_0959-Edit.jpg',
    './../../../assets/aerial/V3--6.jpg',
  ];


openModal(image: string): void {
  const index = this.photoGallery.concat(this.aerialGallery).indexOf(image);
  this.modalImageIndex = index !== -1 ? index : null;
}

closeModal(): void {
  this.modalImageIndex = null;
}

get modalImage(): string | null {
  if (this.modalImageIndex === null) return null;
  const allImages = this.photoGallery.concat(this.aerialGallery);
  return allImages[this.modalImageIndex];
}

prevImage(): void {
  if (this.modalImageIndex !== null && this.modalImageIndex > 0) {
    this.modalImageIndex--;
  }
}

nextImage(): void {
  const allImages = this.photoGallery.concat(this.aerialGallery);
  if (
    this.modalImageIndex !== null &&
    this.modalImageIndex < allImages.length - 1
  ) {
    this.modalImageIndex++;
  }
}
}
