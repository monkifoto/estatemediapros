
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';
import { inject } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { OrderService } from 'src/app/Services/order.service';
import { Order } from 'src/app/Model/order.model';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as bootstrap from 'bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { ImageSelectionService } from 'src/app/Services/image-selection.service';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],
    standalone: false
})
export class GalleryComponent implements OnInit {
  orderId!: string;
  order!: Order;
  imageUrls$: Observable<string[]> | null = null; // Observable for images
  selectedImages: string[] = [];
  safeTourLink: SafeResourceUrl | null = null;
  safeVideoLink: SafeResourceUrl | null = null;
  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedImageUrl: string | null = null;
  private storage: Storage = inject(Storage); // Inject Firebase Storage

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private sanitizer: DomSanitizer,
    private clipboard: Clipboard,
    private imageSelectionService: ImageSelectionService,
    private router: Router,
  ) {}

  get selectedCount(): number {
    return this.selectedImages.length;
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id')!;
    this.loadOrderDetails();
    this.loadGalleryImages();
  }

  loadOrderDetails() {
    this.orderService.getOrderById(this.orderId).subscribe((order) => {
      this.order = order;
      if (this.order.tourLink) {
        this.safeTourLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.order.tourLink);
      }
      if (this.order.videoLink) {
        this.safeVideoLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.order.videoLink);
      }
    });
  }

  loadGalleryImages() {
    const folderPath = `orders/${this.orderId}`;
    const storageRef = ref(this.storage, folderPath);

    this.imageUrls$ = from(listAll(storageRef)).pipe(
      switchMap((result) => {
        const downloadUrlPromises = result.items.map((item) => getDownloadURL(item));
        return from(Promise.all(downloadUrlPromises));
      })
    );
  }

  toggleSelectImage(imageUrl: string): void {
    if (this.selectedImages.includes(imageUrl)) {
      this.selectedImages = this.selectedImages.filter((img) => img !== imageUrl);
    } else {
      this.selectedImages.push(imageUrl);
    }
    this.imageSelectionService.updateSelectedImages(this.selectedImages);
  }

  isSelected(imageUrl: string): boolean {
    return this.selectedImages.includes(imageUrl);
  }

  openContextMenu(event: MouseEvent, image: string): void {
    event.stopPropagation();
    this.selectedImageUrl = image;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    this.contextMenuVisible = true;
  }

  performAction(action: string, imageUrl: string): void {
    switch (action) {
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
    if (this.imageUrls$) {
      this.imageUrls$.subscribe(async (urls: string[]) => {
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
    console.log("Selected Image count", this.selectedImages.length);
    if (this.selectedImages.length === 0) {
      alert('Please select at least one image.');
      return;
    }
    else{

      this.imageSelectionService.updateSelectedImages(this.selectedImages);
      // this.router.navigate(['/order-pdf']);
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
      alert('Link copied to clipboard!');
    } else {
      alert('No link to copy.');
    }
  }

  disableRightClick(event: MouseEvent): void {
    event.preventDefault();
  }
}



