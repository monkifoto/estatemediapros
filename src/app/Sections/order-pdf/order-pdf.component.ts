// order-pdf.component.ts

import { Component, NgZone, OnInit } from '@angular/core';
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

  constructor(private ordersService: OrderService,private ngZone: NgZone) { }

  ngOnInit(): void {
    this.loadImages();
  }

  // Load the images from the service
  loadImages() {
    this.ordersService.loadGalleryImages().subscribe((urls: string[]) => {
      this.imageUrls = urls;
    });
  }


  generatePdf2() {
    console.log("Generating PDF...");
    const doc = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
    const margin = 10; // Margin
    const addressY = margin + 10; // Y position for the address text
    const imageHeight = 50; // Thumbnail height
    const imageWidth = 50; // Thumbnail width
    let x = margin; // X position for images
    let y = addressY + margin + 10; // Y position for images (below the address)

    // Limit to the first 10 images
    const imagesToLoad = this.imageUrls.slice(0, 5);

    // Add order address (replace with actual address)
    const orderAddress = "1234 Elm Street\nSpringfield, IL 62704";
    doc.setFontSize(12);
    doc.text("Order Address:", margin, margin);
    doc.text(orderAddress, margin, addressY);

    console.log('Loading images:', imagesToLoad);

    forkJoin(imagesToLoad.map(url => this.loadImage(url))).subscribe({
      next: (images) => {
        console.log('Images loaded successfully:', images);

        images.forEach((imageData, index) => {
          console.log(`Adding image ${index + 1} to PDF...`);

          // Check if there is enough space on the page
          if (x + imageWidth > doc.internal.pageSize.width - margin) {
            console.log('Moving to next row');
            x = margin;  // Move to the next row
            y += imageHeight + margin;
          }

          // Check if there's enough vertical space on the page
          if (y + imageHeight > doc.internal.pageSize.height - margin) {
            console.log('Adding new page to PDF');
            doc.addPage('l');  // Add a new page in landscape
            x = margin;
            y = addressY + margin + 10; // Reset y position for the new page
            // Re-add the order address on the new page
            doc.text("Order Address:", margin, margin);
            doc.text(orderAddress, margin, addressY);
          }

          // Add the image to the PDF
          try {
            doc.addImage(imageData, 'JPEG', x, y, imageWidth, imageHeight);
            console.log(`Image ${index + 1} added at position (${x}, ${y})`);
          } catch (imageError) {
            console.error(`Failed to add image ${index + 1}:`, imageError);
          }

          x += imageWidth + margin; // Move to the right for the next image
        });

        console.log('Saving PDF...');
        doc.save('order.pdf');
      },
      error: (err) => {
        console.error('Error loading images:', err);
      }
    });
  }


  generatePdf() {
    console.log("Generating PDF...");

    const doc = new jsPDF('p', 'mm', 'a4');
    const imageHeight = 50;  // Thumbnail height
    const imageWidth = 50;   // Thumbnail width
    const margin = 10;       // Margin between thumbnails
    let x = margin;
    let y = margin;

    console.log('Loading images:', this.imageUrls);

    forkJoin(this.imageUrls.map(url => this.loadImage(url))).subscribe({
      next: (images) => {
        console.log('Images loaded successfully:', images);

        images.forEach((imageData, index) => {
          console.log(`Adding image ${index + 1} to PDF...`);

          if (x + imageWidth > doc.internal.pageSize.width - margin) {
            console.log('Moving to next row');
            x = margin;  // Move to the next row
            y += imageHeight + margin;
          }

          if (y + imageHeight > doc.internal.pageSize.height - margin) {
            console.log('Adding new page to PDF');
            doc.addPage();  // Add a new page if we're out of space
            x = margin;
            y = margin;
          }

          // Add the image to the PDF
          try {
            doc.addImage(imageData, 'JPEG', x, y, imageWidth, imageHeight);
            console.log(`Image ${index + 1} added at position (${x}, ${y})`);
          } catch (imageError) {
            console.error(`Failed to add image ${index + 1}:`, imageError);
          }

          x += imageWidth + margin;
        });

        console.log('Saving PDF...');
        doc.save('order.pdf');
      },
      error: (err) => {
        console.error('Error loading images:', err);
      }
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
        const imageData = canvas.toDataURL('image/jpeg');
        console.log('Image loaded:', imageData);  // Log base64 data
        observer.next(imageData);
        observer.complete();
      };
      img.onerror = (error) => {
        observer.error('Failed to load image: ' + url);
      };
    });
  }

}
