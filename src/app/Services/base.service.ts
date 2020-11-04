import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from "rxjs";
import { LocalStorageUtils } from '../utils/localstorage';

import { environment } from 'src/environments/environment';

export abstract class BaseService {
    
    public LocalStorage = new LocalStorageUtils();
    protected UrlServiceV1: string = environment.apiUrlv1

    protected getHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected getAuthorizationHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.getUserToken()}`
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }


    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        let customResponse = { error: { errors: [] }}

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error") {
                customError.push(response.statusText);
                response.error.errors = customError;
            }
        }
        if (response.status === 500) {
            customError.push("Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.");
            
            // Erros do tipo 500 não possuem uma lista de erros
            // A lista de erros do HttpErrorResponse é readonly                
            customResponse.error.errors = customError;
            return throwError(customResponse);
        }

        console.error(response);
        return throwError(response);
    }

}