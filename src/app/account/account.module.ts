import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { AccountAppComponent } from './account.app.component';

import { CustomFormsModule } from 'ngx-custom-validators'
import { RegisterComponent } from './register/register.component';
import { AccountGuard } from './services/account.guard';
import { AccountService } from './services/account.service';
import { AccountRoutingModule } from './account.route';

@NgModule({
  declarations: [
    AccountAppComponent,
    RegisterComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule
  ],
  providers: [
    AccountService,
    AccountGuard
  ]
})
export class AccountModule { }
