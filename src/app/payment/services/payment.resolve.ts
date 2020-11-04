import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Payment } from '../models/payment';
import { PaymentService } from './payment.service';

@Injectable()
export class PaymentResolve implements Resolve<Payment> {

    constructor(private paymentService: PaymentService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.paymentService.GetById(route.params['id']);
    }
}