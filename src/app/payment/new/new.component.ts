import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Payment } from '../models/payment';
import { PaymentService } from '../services/payment.service';
import { FormBaseComponent } from 'src/app/base-component/form-base.component';
import { MASKS } from 'ng-brazil';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  paymentForm: FormGroup;
  payment: Payment = new Payment();
  todayDate: string;

  formResult: string = '';

  hasChanges: boolean;
  public MASKS = MASKS;

  constructor(private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {

    super();

    this.validationMessages = {
      description: {
        required: 'This field is required',
      },
      value: {
        required: 'This field is required',
      },
      startDate: {
        required: 'This field is required',
      },
      type: {
        required: 'This field is required',
      }
    };

    super.configureMessagesValidators(this.validationMessages);
  }

  ngOnInit() {

    this.paymentForm = this.fb.group({
      description: ['', [Validators.required]],
      value: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      type: ['', [Validators.required]],
    })

  }

  ngAfterViewInit(): void {
    super.configureFormBaseValidators(this.formInputElements, this.paymentForm)

    this.todayDate = new Date().toLocaleDateString()
  }

  createPayment() {

    this.spinner.show();

    if (this.paymentForm.valid) {

      this.payment = Object.assign({}, this.payment, this.paymentForm.value);
      this.formResult = JSON.stringify(this.payment);

      if (!this.payment.endDate) {
        delete this.payment.endDate;
      }
      this.payment.value = CurrencyUtils.StringToDecimal(this.payment.value);

      this.paymentService.NewPayment(this.payment)
        .subscribe(
          sucesss => { this.readSucess(sucesss) },
          error => { this.readError(error) }
        );
    } else {
      this.toastr.error('review the required fields.', 'Oops :(');
    }

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  readSucess(response: any) {
    this.paymentForm.reset();
    this.errors = [];

    this.hasChanges = false;

    let toast = this.toastr.success('Payment registered with success!', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/payment/index']);
      });
    }
  }

  readError(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('an error has occurred!', 'Oops :(');
  }
}