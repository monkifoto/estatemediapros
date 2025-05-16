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
      before: 'assets/virtual-staging/A7402305.jpg',
      after: 'assets/virtual-staging/17471594473_liv3.jpg'
    },
      {
      before: 'assets/virtual-staging/before1.jpg',
      after: 'assets/virtual-staging/after1.jpg'
    },
    {
      before: 'assets/virtual-staging/before2.jpg',
      after: 'assets/virtual-staging/after2.jpg'
    },
    {
      before: 'assets/virtual-staging/before3.jpg',
      after: 'assets/virtual-staging/after3.jpg'
    }
  ];


  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('afterImg') afterImgRef!: ElementRef;
  @ViewChild('divider') dividerRef!: ElementRef;

  ngAfterViewInit() {
    const container = this.containerRef.nativeElement;
    const afterImg = this.afterImgRef.nativeElement;
    const divider = this.dividerRef.nativeElement;

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
  }
}
