// src/app/gallery/gallery.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, Observable } from 'rxjs';
import { OrderService } from 'src/app/Services/order.service';
import { Order } from 'src/app/Model/order.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  orderId!: string;
  order!: Order;
  imageUrls: Observable<string[]> | null = null;

  constructor(private route: ActivatedRoute, private storage: AngularFireStorage, private orderService: OrderService) {}

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

  downloadAll(): void {
    if (this.imageUrls) {
      // Subscribe to the observable to get the image URLs
      this.imageUrls.subscribe((urls: string[]) => {
        urls.forEach((url, index) => {
          // Create an anchor element to programmatically trigger the download
          const a = document.createElement('a');
          a.href = url;
          a.download = `image-${index + 1}.jpg`;  // You can customize the file name here
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
      });
    }
  }
}
