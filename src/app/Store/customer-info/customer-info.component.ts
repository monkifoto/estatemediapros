import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Customer } from 'src/app/Model/customer.model';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent {
  @Input() customerForm!: FormGroup;

}
