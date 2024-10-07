// gallery.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, Observable } from 'rxjs';
import { OrderService } from 'src/app/Services/order.service';
import { Order } from 'src/app/Model/order.model';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as bootstrap from 'bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  orderId!: string;
  order!: Order;
  imageUrls: Observable<string[]> | null = null;
  selectedImages: string[] = [];
  safeTourLink: SafeResourceUrl | null = null;
  safeVideoLink: SafeResourceUrl | null = null;
  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedImageUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private orderService: OrderService,
    private sanitizer: DomSanitizer,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id')!;
    this.loadOrderDetails();
    this.loadGalleryImages();
  }

  loadOrderDetails() {
    this.orderService.getOrderById(this.orderId).subscribe((order) => {
      this.order = order;  // Populate the order object
      console.log(order);
      if (this.order.tourLink) {
        this.safeTourLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.order.tourLink);
      }
      if (this.order.videoLink) {
        this.safeVideoLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.order.videoLink);
      }
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
  toggleSelectImage(imageUrl: string): void {
    if (this.selectedImages.includes(imageUrl)) {
      this.selectedImages = this.selectedImages.filter((img) => img !== imageUrl);
    } else {
      this.selectedImages.push(imageUrl);
    }
  }

  isSelected(imageUrl: string): boolean {
    return this.selectedImages.includes(imageUrl);
  }

  openContextMenu(event: MouseEvent, image: string): void {
    event.stopPropagation();
    this.selectedImageUrl = image;  // set selected image for the context menu actions
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    this.contextMenuVisible = true;
  }

  performAction(action: string, imageUrl: string): void {
    switch(action) {
      case 'Open':
        this.openModal(imageUrl);
        break;
      case 'Share':
        this.clipboard.copy(imageUrl);
        alert('Image URL copied to clipboard!');
        break;
      case 'Delete':
        // add delete logic here
        break;
    }
    this.closeContextMenu();
  }


  downloadAllAsZip(): void {
    if (this.imageUrls) {
      this.imageUrls.subscribe(async (urls: string[]) => {
        const zip = new JSZip();
        const imgFolder = zip.folder('images');
        const imagePromises = urls.map(async (url, index) => {
          const response = await fetch(url);
          const blob = await response.blob();
          imgFolder?.file(`image-${index + 1}.jpg`, blob);
        });
        await Promise.all(imagePromises);
        zip.generateAsync({ type: 'blob' }).then((zipContent) => saveAs(zipContent, 'images.zip'));
      });
    }
  }

  generateSelectedPdf(): void {
    if (this.selectedImages.length === 0) {
      alert('Please select at least one image.');
      return;
    }
    // Implement the PDF generation with selected images
  }

  openModal(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
    const modalElement = document.getElementById('imageModal') as HTMLElement;
    const modalImg = document.getElementById('fullImage') as HTMLImageElement;
    modalImg.src = imageUrl;
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }

  closeContextMenu(): void {
    this.contextMenuVisible = false;
  }

  copyLinkToClipboard(link: string): void {
    if (link) {
      this.clipboard.copy(link);
      alert('Link copied to clipboard!'); // Optional: Notification to user
    } else {
      alert('No link to copy.');
    }
  }

}
