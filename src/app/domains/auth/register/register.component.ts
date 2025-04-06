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
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Ai1FormValidatorError } from '../form.errors';
import { AuthService } from '../auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

const REGITER_FORM_PROPS = {
  EMAIL: 'email',
  USERNAME: 'username',
  PASSWORD: 'password',
};

@Component({
  selector: 'ngs-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
  ],
})
export default class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  registerProps = REGITER_FORM_PROPS;
  registerForm = this.fb.group({
    [this.registerProps.EMAIL]: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    [this.registerProps.USERNAME]: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    [this.registerProps.PASSWORD]: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    
  });

  isSpin = signal(false);

  get email(): AbstractControl<any, any> | null {
    return this.registerForm?.get(REGITER_FORM_PROPS.EMAIL);
  }

  get username(): AbstractControl<any, any> | null {
    return this.registerForm?.get(REGITER_FORM_PROPS.USERNAME);
  }

  get password(): AbstractControl<any, any> | null {
    return this.registerForm?.get(REGITER_FORM_PROPS.PASSWORD);
  }

  get isFormDisabled() {
    return this.registerForm?.disabled || this.registerForm?.invalid;
  }

  getError(ctrl: AbstractControl | null, name: string) {
    return Ai1FormValidatorError.getFormControlErrorText(ctrl, name);
  }

  async registerEmail() {
    try {
      this.isSpin.set(true);
      this.registerForm?.disable();

      await this.authService.createUserWithEmailAndPassword(
        this.registerForm.getRawValue() as Partial<{ [x: string]: string }>
      );
    } finally {
      this.isSpin.set(false);
      this.registerForm?.enable();
    }
  }
}
