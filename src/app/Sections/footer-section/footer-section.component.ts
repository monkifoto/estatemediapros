import { Component } from '@angular/core';
import { SubscriberService } from '../../services/subscriber.service';

@Component({
  selector: 'app-footer-section',
  templateUrl: './footer-section.component.html',
  styleUrls: ['./footer-section.component.css']
})
export class FooterSectionComponent {
  email: string = ''; // Two-way binding for email input

  constructor(private subscriberService: SubscriberService) {}

  // Handle form submission
  onSubscribe(): void {
    if (this.email) {
      this.subscriberService.subscribe(this.email).then(
        () => {
          console.log('Subscription successful');
          alert('Thank you for subscribing!');
          this.email = ''; // Clear the input after subscribing
        },
        (error) => {
          console.error('Error subscribing:', error);
          alert('There was an error with your subscription. Please try again.');
        }
      );
    } else {
      alert('Please enter a valid email address.');
    }
  }
}
