import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ngx-custom-validators';

import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { FormBaseComponent } from 'src/app/base-component/form-base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  registerForm: FormGroup;
  user: User;

  hasChanges: boolean;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
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
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    super.configureMessagesValidators(this.validationMessages);    
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
      confirmPassword:['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    });
  }

  ngAfterViewInit(): void {
    super.configureFormBaseValidators(this.formInputElements, this.registerForm);
  }

  newAccount() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.user = Object.assign({}, this.user, this.registerForm.value);

      this.accountService.registerUser(this.user)
      .subscribe(
          sucesso => {this.sendSuccess(sucesso)},
          falha => {this.sendFail(falha)}
      );

      this.hasChanges = false;
    }
  }

  sendSuccess(response: any) {
    this.registerForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveLocalUser(response);

    let toast = this.toastr.success('Successfully registered', 'Welcome!');
    if(toast){
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  sendFail(fail: any){
    this.errors = fail.error.errors;
    this.toastr.error('an error has occurred!', 'Oops :(');
  }
}
