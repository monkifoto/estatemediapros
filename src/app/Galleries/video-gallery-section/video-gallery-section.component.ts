import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer , SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-video-gallery-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-gallery-section.component.html',
  styleUrls: ['./video-gallery-section.component.css']
})
export class VideoGallerySectionComponent {
    constructor(private sanitizer: DomSanitizer) {}

walkthroughVideos = [

  { videoId: 'abc12345678' }
];

socialVideos = [
  { videoId: 'kc7v9bzKi1k' }
];

slideshowVideos = [
   { videoId: '6u01EDJxWn4' },
  { videoId: '2_2ojWh9EcA' }
];


  activeGallery: 'walkthrough' | 'social' | 'slideshow' | null = null;
  modalIndex: number | null = null;

  openModal(gallery: 'walkthrough' | 'social' | 'slideshow', index: number) {
    this.activeGallery = gallery;
    this.modalIndex = index;
  }

  closeModal() {
    this.activeGallery = null;
    this.modalIndex = null;
  }

  getActiveList() {
    switch (this.activeGallery) {
      case 'walkthrough': return this.walkthroughVideos;
      case 'social': return this.socialVideos;
      case 'slideshow': return this.slideshowVideos;
      default: return [];
    }
  }

  getActiveVideo() {
    const list = this.getActiveList();
    return this.modalIndex !== null ? list[this.modalIndex] : null;
  }

  prev() {
    const list = this.getActiveList();
    if (this.modalIndex !== null) {
      this.modalIndex = (this.modalIndex + list.length - 1) % list.length;
    }
  }

  next() {
    const list = this.getActiveList();
    if (this.modalIndex !== null) {
      this.modalIndex = (this.modalIndex + 1) % list.length;
    }
  }

getActiveVideoId(): string | null {
  const list = this.getActiveList();
  return this.modalIndex !== null ? list[this.modalIndex]?.videoId : null;
}

  getSafeVideoUrl(): SafeResourceUrl | null {
    const id = this.getActiveVideoId();
    return id
      ? this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${id}?autoplay=1`
        )
      : null;
  }

getThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
}
