import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Archive } from '../models/archive';

@Injectable()
export class ArchiveService extends BaseService {

    constructor(private http: HttpClient) { super() }

    getAll(): Observable<Archive[]> {
        return this.http
            .get<Archive[]>(this.UrlServiceV1 + "archive", super.getHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Archive> {
        return this.http
            .get<Archive>(this.UrlServiceV1 + "archive/" + id, super.getHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    newArchive(archive: Archive): Observable<Archive> {
        return this.http
            .post(this.UrlServiceV1 + "archive", archive, super.getHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
    
    DeleteArchive(id: string): Observable<Archive> {
        return this.http
            .delete(this.UrlServiceV1 + "archive/" + id, super.getHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

}
