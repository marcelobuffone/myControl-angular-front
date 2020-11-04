import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { ChartsModule } from 'ng2-charts';

import { NewComponent } from './new/new.component';
import { DeleteComponent } from './delete/delete.component';
import { IndexComponent } from './index/index.component';
import { DetailsComponent } from './details/details.component';
import { UpdateComponent } from './update/update.component';
import { PaymentRoutingModule } from './payment.route';
import { PaymentAppComponent } from './payment.app.component';
import { PaymentService } from './services/payment.service';
import { PaymentGuard } from './services/payment.guard';
import { NgBrazil } from 'ng-brazil' 
import { TextMaskModule } from 'angular2-text-mask';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { PaymentResolve } from './services/payment.resolve';

@NgModule({
  declarations: [
    PaymentAppComponent,
    NewComponent, 
    DeleteComponent, 
    IndexComponent,
    DetailsComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ChartsModule,
    TextMaskModule,
    NgBrazil,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers:
  [
    PaymentService,
    PaymentGuard,
    PaymentResolve
  ]
})
export class PaymentModule { }
