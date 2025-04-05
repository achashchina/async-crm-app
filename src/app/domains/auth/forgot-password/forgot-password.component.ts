import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
import { Ai1FormValidatorError } from '../form.errors';
import { AuthService } from '../auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'ngs-forgot-password',
  templateUrl: './forgot-password.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
  ],
})
export default class ForgotPasswordComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  forgotPwdForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  isSpin = signal(false);
  isEmailSent = signal(false);

  get email(): AbstractControl<any, any> | null {
    return this.forgotPwdForm?.get('email');
  }

  get isFormDisabled() {
    return this.forgotPwdForm.disabled || this.forgotPwdForm.invalid;
  }

  ngOnInit(): void {
    this.forgotPwdForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }


  getError(ctrl: AbstractControl | null, name: string) {
    return Ai1FormValidatorError.getFormControlErrorText(ctrl, name);
  }

  async forgotPassword() {
    try {
      this.isSpin.set(true);
      this.forgotPwdForm.disable();
      await this.authService.sendPasswordResetEmail(
        this.forgotPwdForm.value.email || ''
      );
    } finally {
      this.isSpin.set(false);
      this.forgotPwdForm.enable();
    }
  }
}
