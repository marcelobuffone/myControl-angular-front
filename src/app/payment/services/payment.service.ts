import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Payment } from '../models/payment';

@Injectable()
export class PaymentService extends BaseService {

    payment: Payment = new Payment();

    constructor(private http: HttpClient) {
        super()


    }

    GetAll(): Observable<Payment[]> {
        return this.http
            .get<Payment[]>(this.UrlServiceV1 + "payment", super.getAuthorizationHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    GetById(id: string): Observable<Payment> {
        return this.http
            .get<Payment>(this.UrlServiceV1 + "payment/" + id, super.getAuthorizationHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    NewPayment(payment: Payment): Observable<Payment> {
        return this.http
            .post(this.UrlServiceV1 + "payment", payment, this.getAuthorizationHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    UpdatePayment(payment: Payment): Observable<Payment> {
        return this.http
            .put(this.UrlServiceV1 + "payment/" + payment.id, payment, super.getAuthorizationHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    DeletePayment(id: string): Observable<Payment> {
        return this.http
            .delete(this.UrlServiceV1 + "payment/" + id, super.getAuthorizationHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
