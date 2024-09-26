import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.css']
})
export class ContactSectionComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('https://your-project-id.cloudfunctions.net/sendContactEmail', this.formData)
      .subscribe(
        response => console.log('Email sent successfully', response),
        error => console.error('Error sending email', error)
      );
  }
}
