// src/app/gallery/gallery.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  orderId!: string;
  imageUrls: Observable<string[]> | null = null;

  constructor(private route: ActivatedRoute, private storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id')!;
    this.loadGalleryImages();
  }

  loadGalleryImages() {
    const folderPath = `orders/${this.orderId}`;
    this.storage.ref(folderPath).listAll().subscribe((result) => {
      // Convert the Promise to an Observable using `from`
      this.imageUrls = from(Promise.all(result.items.map((item) => item.getDownloadURL())));
    });
  }
}
