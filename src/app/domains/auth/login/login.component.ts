import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { RouterLink } from '@angular/router';
import { Ai1FormValidatorError } from '../form.errors';
import { AuthService } from '../auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

const LOGIN_FORM_PROPS = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

@Component({
  selector: 'ngs-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
  ],
})
export default class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  loginProps = LOGIN_FORM_PROPS;
  loginForm = this.fb.nonNullable.group({
    [this.loginProps.EMAIL]: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    [this.loginProps.PASSWORD]: new FormControl('', [
      Validators.required,
      Validators.minLength(6), // optional
    ]),
  });

  isSpin = signal(false);

  get email(): AbstractControl<any, any> | null {
    return this.loginForm?.get(LOGIN_FORM_PROPS.EMAIL);
  }
  get password(): AbstractControl<any, any> | null {
    return this.loginForm?.get(LOGIN_FORM_PROPS.PASSWORD);
  }

  get isFormDisabled() {
    return this.loginForm.disabled || this.loginForm.invalid;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      [this.loginProps.EMAIL]: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      [this.loginProps.PASSWORD]: new FormControl('', [
        Validators.required,
        Validators.minLength(6), // optional
      ]),
    });
  }

  getError(ctrl: AbstractControl | null, name: string) {
    return Ai1FormValidatorError.getFormControlErrorText(ctrl, name);
  }

  async loginEmail() {
    try {
      this.#enableProcess();

      await this.authService.signInWithEmailAndPassword(
        //@ts-ignore
        this.loginForm.getRawValue()
      );
    } finally {
      this.#disableProcess();
      this.loginForm?.updateValueAndValidity();
    }
  }

  async loginGoogle() {
    try {
      this.#enableProcess();
      await this.authService.signInWithPopupGoogle();
    } finally {
      this.#disableProcess();
    }
  }

  async loginGithub() {
    try {
      this.#enableProcess();
      await this.authService.signInWithPopupGithub();
    } finally {
      this.#disableProcess();
    }
  }

  #enableProcess() {
    this.isSpin.set(true);
    this.loginForm?.disable();
  }

  #disableProcess() {
    this.isSpin.set(false);
    this.loginForm?.enable();
  }
}
