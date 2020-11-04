import { Component, OnInit } from '@angular/core';

import { Payment } from '../models/payment';
import { PaymentService } from '../services/payment.service';

import { ChartType, ChartOptions } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { StringUtils } from 'src/app/utils/string-utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})

export class IndexComponent implements OnInit {

  public payments: Payment[];
  errors: any[] = [];

  total: number = 0;
  profit: number = 0;
  expense: number = 0;

  paymentSelectedToDelete: string;
  paymentNameSelectedToDelete: string;

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  public paymentsPagined: Payment[];

  descriptionSearch: any;

  public pieChartOptions: ChartOptions = { responsive: true };
  public pieChartLabels: Label[] = [['Profit'], ['Expense']];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
    },
  ];

  pieChartData(): SingleDataSet {
    return [StringUtils.roundNumber(this.expense), StringUtils.roundNumber(this.profit)];
  }

  constructor(private paymentService: PaymentService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.paymentService.GetAll()
      .subscribe(
        payments => this.payments = payments,
        errors => this.errors = errors,
        () => this.inicialize(this.payments));
  }

  search() {
    if (this.descriptionSearch == "") {
      this.paymentsPagined = this.payments;
    } else {
      this.paymentsPagined = this.payments.filter(res => {
        return res.description.toLocaleLowerCase().match(this.descriptionSearch.toLocaleLowerCase());
      })
    }
  }

  inicialize(payments: Payment[]): void {
    this.calculateFields(payments);
    this.collectionSize = payments.length;
    this.refreshPayments();
  }

  refreshPayments() {
    this.paymentsPagined = this.payments
      .map((payment, i) => ({ id: i + 1, ...payment }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  calculateFields(payments: Payment[]): void {
    this.profit = Number(payments.reduce((sum: number, payment: Payment) => payment.type == 'profit' ? sum += (payment.value) : sum += 0, 0));
    this.expense = Number(payments.reduce((sum: number, payment: Payment) => payment.type == 'expense' ? sum += (payment.value) : sum += 0, 0));
    this.total = this.profit - this.expense;
  }

  openModal(content, id) {
    this.paymentSelectedToDelete = id;
    this.paymentNameSelectedToDelete = this.payments.filter(obj => obj.id === id)[0].description;
    this.modalService.open(content);
  }

  deletePayment() {

    if (this.paymentSelectedToDelete) {
      this.paymentService.DeletePayment(this.paymentSelectedToDelete)
        .subscribe(
          payment => { this.deleteSucess(payment) },
          error => { this.fail(error) }
        );
    }
    this.modalService.dismissAll();
  }

  deleteSucess(evento: any) {
    let toast = this.toastr.success('Payment deleted with success!', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  fail(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('an error has occurred!', 'Oops :(');
  }


}
