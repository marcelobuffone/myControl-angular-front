import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';

import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { FormBaseComponent } from 'src/app/base-component/form-base.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends FormBaseComponent  implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  loginForm: FormGroup;
  user: User;

  returnUrl: string;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    
      super();

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    };

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    super.configureMessagesValidators(this.validationMessages);    
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    });
  }

  ngAfterViewInit(): void {
    super.configureFormBaseValidators(this.formInputElements, this.loginForm);
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.user = Object.assign({}, this.user, this.loginForm.value);

      this.accountService.login(this.user)
      .subscribe(
          sucesso => {this.sendSuccess(sucesso)},
          falha => {this.sendFail(falha)}
      );
    }
  }

  sendSuccess(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveLocalUser(response);

    let toast = this.toastr.success('Login done!', 'Welcome!');
    if(toast){
      toast.onHidden.subscribe(() => {
        this.returnUrl
        ? this.router.navigate([this.returnUrl])
        : this.router.navigate(['/home']);      });
    }
  }

  sendFail(fail: any){
    this.errors = fail.error.errors;
    this.toastr.error('an error has occurred!', 'Oops :(');
  }
}
