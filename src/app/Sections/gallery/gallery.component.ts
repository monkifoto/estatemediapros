// src/app/gallery/gallery.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, Observable } from 'rxjs';
import { OrderService } from 'src/app/Services/order.service';
import { Order } from 'src/app/Model/order.model';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  orderId!: string;
  order!: Order;
  imageUrls: Observable<string[]> | null = null;
  selectedImageUrl: string | undefined;

  constructor(private route: ActivatedRoute, private storage: AngularFireStorage, private orderService: OrderService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id')!;
    this.loadOrderDetails();
    this.loadGalleryImages();
  }

  loadOrderDetails() {
    this.orderService.getOrderById(this.orderId).subscribe((order) => {
      this.order = order;  // Populate the order object
      console.log ("loadOrderDetails", order);
    });
  }

  loadGalleryImages() {
    const folderPath = `orders/${this.orderId}`;

    this.storage.ref(folderPath).listAll().subscribe((result) => {
      console.log('Files in folder:', result.items); // Logs the metadata of all files

      // Log file names
      result.items.forEach(item => {
        console.log('File:', item.name); // Logs each file name

        // Get and log the download URL
        item.getDownloadURL().then(url => {
          console.log('File URL:', url);
        }).catch(err => {
          console.error('Error fetching URL:', err);
        });
      });

      // Convert the Promise to an Observable for handling the image URLs
      this.imageUrls = from(Promise.all(result.items.map((item) => item.getDownloadURL())));
    }, (error) => {
      console.error('Error loading gallery images:', error); // Log any errors
    });
  }

  openModal(imageUrl: string) {
    console.log(imageUrl);
    this.selectedImageUrl = imageUrl;
    const modalElement = document.getElementById('imageModal') as HTMLElement;
    const modalImg = document.getElementById('fullImage') as HTMLImageElement;
    modalImg.src = imageUrl;

    // Use Bootstrap modal to show the modal
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }

  // Disable right-click to prevent saving images
  disableRightClick(event: Event) {
    event.preventDefault();
  }

  downloadAllAsZip(): void {
    if (this.imageUrls) {
      this.imageUrls.subscribe(async (urls: string[]) => {
        const zip = new JSZip();
        const imgFolder = zip.folder('images');

        // Fetch and add each image to the zip folder
        const imagePromises = urls.map(async (url, index) => {
          const response = await fetch(url);
          const blob = await response.blob();
          imgFolder?.file(`image-${index + 1}.jpg`, blob);
        });

        // Wait for all the images to be added to the zip
        await Promise.all(imagePromises);

        // Generate the zip file
        zip.generateAsync({ type: 'blob' }).then((zipContent) => {
          // Save the zip file
          saveAs(zipContent, 'images.zip');
        });
      });
    }
  }
}
