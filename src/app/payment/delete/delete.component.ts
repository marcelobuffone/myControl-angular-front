import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent {

  payment: Payment = new Payment();
  errors: any[] = [];

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.payment = this.route.snapshot.data['payment'];
  }

  deleteEvent() {
    this.paymentService.DeletePayment(this.payment.id)
      .subscribe(
        fornecedor => { this.deleteSucess(fornecedor) },
        error => { this.fail(error) }
      );
  }

  deleteSucess(evento: any) {

    const toast = this.toastr.success('Payment Deleted with sucess', '');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/payment/index']);
      });
    }
  }

  fail(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('an error has occurred!', 'Oops :(');
  }
}
