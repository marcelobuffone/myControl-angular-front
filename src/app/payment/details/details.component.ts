import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../models/payment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  payment: Payment = new Payment();

  constructor(private route: ActivatedRoute) {

    this.payment = this.route.snapshot.data['payment'];
  }

}
