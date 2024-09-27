import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-section',
  templateUrl: './footer-section.component.html',
  styleUrls: ['./footer-section.component.css']
})
export class FooterSectionComponent {
  constructor() {}

  // Handle form submission (if needed)
  onSubscribe(email: string): void {
    console.log('Email:', email);
  }
}
