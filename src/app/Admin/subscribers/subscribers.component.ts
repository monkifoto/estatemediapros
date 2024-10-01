import { Component, OnInit } from '@angular/core';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  subscribers: any[] = [];

  constructor(private subscriberService: SubscriberService) {}

  ngOnInit(): void {
    // Fetch subscribers when the component is initialized
    this.subscriberService.getSubscribers().subscribe(
      (data) => {
        this.subscribers = data;
      },
      (error) => {
        console.error('Error fetching subscribers:', error);
      }
    );
  }
}
