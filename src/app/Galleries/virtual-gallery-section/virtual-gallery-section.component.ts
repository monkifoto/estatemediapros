import {
  Component
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeforeAfterSliderComponent } from 'src/app/Shared/before-after-slider/before-after-slider.component';

@Component({
  selector: 'app-virtual-gallery-section',
  standalone: true,
  imports: [CommonModule, BeforeAfterSliderComponent],
  templateUrl: './virtual-gallery-section.component.html',
  styleUrls: ['./virtual-gallery-section.component.css']
})
export class VirtualGallerySectionComponent  {
 images: { before: string; after: string }[] = [
    {
      before: 'assets/virtual_staging/A7402305.jpg',
      after: 'assets/virtual_staging/17471594473_liv3.jpg'
    },
      {
      before: 'assets/virtual_staging/Living Room From Left.jpg',
      after: 'assets/virtual_staging/Living Room From Left_edited.jpg'
    },
    {
      before: 'assets/virtual_staging/Family_Room_Left.jpg',
      after: 'assets/virtual_staging/Family_Room_Left_edited.jpg'
    },
    {
      before: 'assets/virtual_staging/A7401181.jpg',
      after: 'assets/virtual_staging/VS-7401181.jpg'
    },
      {
      before: 'assets/virtual_staging/A7401249.jpg',
      after: 'assets/virtual_staging/VS-7401249.jpg'
    }
    ,
      {
      before: 'assets/virtual_staging/A7401195.jpg',
      after: 'assets/virtual_staging/VS-7401195.jpg'
    }
  ];
}
