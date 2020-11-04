import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { PaymentAppComponent } from './payment.app.component';
import { PaymentGuard } from './services/payment.guard';
import { PaymentResolve } from './services/payment.resolve';
import { UpdateComponent } from './update/update.component';



const paymentRouterConfig: Routes = [
    {
        path: '', component: PaymentAppComponent,
        children: [
            { path: 'index', component: IndexComponent },
            { path: '', component: IndexComponent },
            {
                path: 'new', component: NewComponent,
                canDeactivate: [PaymentGuard],
                canActivate: [PaymentGuard]
            },
            {
                path: 'update/:id', component: UpdateComponent,
                canActivate: [PaymentGuard],
                resolve: {
                    payment: PaymentResolve
                }
            },            
            {
                path: 'details/:id', component: DetailsComponent,
                canActivate: [PaymentGuard],
                resolve: {
                    payment: PaymentResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteComponent,
                canActivate: [PaymentGuard],
                resolve: {
                    payment: PaymentResolve
                }
            }        
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(paymentRouterConfig)
    ],
    exports: [RouterModule]
})
export class PaymentRoutingModule { }