import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

export abstract class BaseGuard {

    private localStorageUtils = new LocalStorageUtils();

    constructor(protected router: Router){}
    
    protected validateClaim(routeAc: ActivatedRouteSnapshot) : boolean {

        if(!this.localStorageUtils.getUserToken()){
            this.router.navigate(['/account/login/'], { queryParams: { returnUrl: this.router.url }});
        }  

        let user = this.localStorageUtils.getUser();

        let claim: any = routeAc.data[0];
        if (claim !== undefined) {
            let claim = routeAc.data[0]['claim'];

            if (claim) {
                if (!user.claims) {
                    this.accessDeniedRedirect();
                }
                
                let userClaims = user.claims.find(x => x.type === claim.nome);
                
                if(!userClaims){
                    this.accessDeniedRedirect();
                }
                
                let claimValues = userClaims.value as string;

                if (!claimValues.includes(claim.valor)) {
                    this.accessDeniedRedirect();
                }
            }
        }

        return true;  
    }

    private accessDeniedRedirect() {
        this.router.navigate(['/not-found']);
    }    
}