import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent {
  photos = [
    { name: 'Essential Photos', description: 'High-quality photos', image: 'path/to/image.jpg' },
    { name: 'Showcase Photos', description: 'Premium quality', image: 'path/to/image2.jpg' },
    { name: 'Aerial Photos', description: 'Drone photos', image: 'path/to/image3.jpg' }
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addProduct(product);
  }
}
