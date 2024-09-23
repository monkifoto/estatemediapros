import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class  VideoComponent {
  videos = [
    { name: 'MLS Video', description: 'Standard listing video', image: 'path/to/video1.jpg' },
    { name: 'Reel', description: 'Social media reel', image: 'path/to/video2.jpg' },
    { name: 'Slideshow', description: 'Photo slideshow video', image: 'path/to/video3.jpg' }
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addProduct(product);
  }
}
