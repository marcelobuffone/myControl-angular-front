import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountAppComponent } from './account.app.component';
import { RegisterComponent } from './register/register.component';
import { AccountGuard } from './services/account.guard';

const contaRouterConfig: Routes = [
    {
        path: '', component: AccountAppComponent,
        children: [
            { path: 'register', component: RegisterComponent, canActivate: [AccountGuard], canDeactivate: [AccountGuard] },
            { path: 'login', component: LoginComponent, canActivate: [AccountGuard] }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(contaRouterConfig)
    ],
    exports: [RouterModule]
})
export class AccountRoutingModule { }