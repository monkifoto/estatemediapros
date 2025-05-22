import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BeforeAfterSliderComponent } from 'src/app/Shared/before-after-slider/before-after-slider.component';


@Component({
    selector: 'app-photography-section',
    templateUrl: './photography-section.component.html',
    styleUrls: ['./photography-section.component.css'],
    standalone: true,
    imports: [CommonModule, BeforeAfterSliderComponent, RouterModule]
})
export class PhotoSectionComponent {
showcaseEssentialImages = [
  {
    before: 'assets/virtual_staging/A7402305.jpg',
    after: 'assets/virtual_staging/17471594473_liv3.jpg'
  }];
}
