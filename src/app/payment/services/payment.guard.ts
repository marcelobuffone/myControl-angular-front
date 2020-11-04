import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate } from '@angular/router';
import { BaseGuard } from 'src/app/Services/base.guard';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { NewComponent } from '../new/new.component';

@Injectable()
export class PaymentGuard extends BaseGuard implements CanActivate, CanDeactivate<NewComponent> {

    constructor(protected router: Router) { super(router); }

    canDeactivate(component: NewComponent) {
        if(component.hasChanges) {
            return window.confirm('Do you want to leave the form?');
        }        
        return true
    }

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return super.validateClaim(routeAc);
    }
}