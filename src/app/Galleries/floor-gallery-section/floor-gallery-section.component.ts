import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-floor-gallery-section',
  imports: [CommonModule],
  templateUrl: './floor-gallery-section.component.html',
  styleUrl: './floor-gallery-section.component.css',
  standalone: true,
})
export class FloorGallerySectionComponent {
  modalImage: string | null = null;

  photoGallery = [
    './../../../assets/floor_plan/all_floors_1417_195th_place_southwest_lynnwood_without_dim.jpg',
    './../../../assets/floor_plan/all_floors_14250_131st_avenue_northeast_kirkland_without_dim.jpg',
    './../../../assets/floor_plan/all_floors_16208_northeast_109th_street_16209_redmond_with_dim.jpg',
    './../../../assets/floor_plan/all_floors_11050_31st_avenue_southwest_seattle_without_dim.jpg',
    './../../../assets/floor_plan/all_floors_130_southwest_194th_street_normandy_park_without_dim.jpg',
    './../../../assets/floor_plan/all_floors_3017_north_bennett_street_tacoma_with_dim.jpg',
    './../../../assets/floor_plan/all_floors_9520_18th_place_northwest_seattle_without_dim.jpg',
    './../../../assets/floor_plan/all_floors_11611_northeast_135th_street_kirkland_without_dim.jpg',
     './../../../assets/floor_plan/all_floors_28229_46th_avenue_south_auburn_without_dim.jpg',
    './../../../assets/floor_plan/all_floors_jpg_1509_5th_street_southeast_1501_5th_street_southeast__puyallup.jpg',
    './../../../assets/floor_plan/all_floors_without-dimensions_panorama_drive_211__cle_elum.jpg',
  ];



  openModal(image: string): void {
    this.modalImage = image;
  }

  closeModal(): void {
    this.modalImage = null;
  }
}


