import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-virtual-gallery-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-gallery-section.component.html',
  styleUrls: ['./virtual-gallery-section.component.css']
})
export class VirtualGallerySectionComponent implements AfterViewInit {
  @Input() images: { before: string; after: string }[] = [
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


@ViewChildren('container') containerRefs!: QueryList<ElementRef>;
@ViewChildren('afterImg') afterImgRefs!: QueryList<ElementRef>;
@ViewChildren('divider') dividerRefs!: QueryList<ElementRef>;

  ngAfterViewInit() {
  setTimeout(() => {
      this.initializeSliders();
    });
  }

  private initializeSliders(){
      this.containerRefs.forEach((containerRef, index) => {
    const container = containerRef.nativeElement;
    const afterImg = this.afterImgRefs.get(index)?.nativeElement;
    const divider = this.dividerRefs.get(index)?.nativeElement;

    if (!afterImg || !divider) return;

    const move = (clientX: number) => {
      const rect = container.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percent = (x / rect.width) * 100;
      afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      divider.style.left = `${x}px`;
    };

    const startDrag = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const onMove = (ev: MouseEvent | TouchEvent) => {
        const clientX =
          ev instanceof MouseEvent ? ev.clientX : ev.touches[0].clientX;
        move(clientX);
      };

      const endDrag = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('touchmove', onMove);
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchend', endDrag);
    };

    divider.addEventListener('mousedown', startDrag);
    divider.addEventListener('touchstart', startDrag);
  });
  }
}
