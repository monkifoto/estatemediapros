// order-pdf.component.ts

import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { OrderService } from 'src/app/Services/order.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-order-pdf',
  templateUrl: './order-pdf.component.html',
  styleUrls: ['./order-pdf.component.css']
})
export class OrderPdfComponent implements OnInit {

  imageUrls: string[] = [];

  constructor(private ordersService: OrderService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  // Load the images from the service
  loadImages() {
    this.ordersService.loadGalleryImages().subscribe((urls: string[]) => {
      this.imageUrls = urls;
    });
  }

  // Generate PDF with thumbnails
  generatePdf() {
    const doc = new jsPDF('p', 'mm', 'a4');
    const imageHeight = 50;  // Thumbnail height
    const imageWidth = 50;   // Thumbnail width
    const margin = 10;       // Margin between thumbnails
    let x = margin;
    let y = margin;

    forkJoin(this.imageUrls.map(url => this.loadImage(url))).subscribe((images) => {
      images.forEach((imageData, index) => {
        if (x + imageWidth > doc.internal.pageSize.width - margin) {
          x = margin;  // Move to the next row
          y += imageHeight + margin;
        }

        if (y + imageHeight > doc.internal.pageSize.height - margin) {
          doc.addPage();  // Add a new page if we're out of space
          x = margin;
          y = margin;
        }

        doc.addImage(imageData, 'JPEG', x, y, imageWidth, imageHeight);
        x += imageWidth + margin;
      });

      doc.save('thumbnails.pdf');
    });
  }

  // Helper function to load image data as base64
  loadImage(url: string): Observable<string> {
    return new Observable<string>((observer) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        observer.next(canvas.toDataURL('image/jpeg'));
        observer.complete();
      };
      img.onerror = (error) => {
        observer.error('Failed to load image: ' + url);
      };
    });
  }
}
