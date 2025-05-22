import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-before-after-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './before-after-slider.component.html',
  styleUrls: ['./before-after-slider.component.css']
})
export class BeforeAfterSliderComponent implements AfterViewInit {
  @Input() before!: string;
  @Input() after!: string;
  @Input() beforeLabel: string = 'Before';
  @Input() afterLabel: string = 'After';

  @ViewChild('container', { static: true }) containerRef!: ElementRef;
  @ViewChild('afterImg', { static: true }) afterImgRef!: ElementRef;
  @ViewChild('divider', { static: true }) dividerRef!: ElementRef;

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
