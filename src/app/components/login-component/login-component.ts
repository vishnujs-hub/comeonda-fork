import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Authservice } from '../../../services/authservice';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  builder = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  authService = inject(Authservice);

  loginForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  logIn() {
    console.log('value', this.loginForm.value);
    if (this.loginForm.invalid) return;
    const credentials = {
      username: this.loginForm.value.name as string,
      password: this.loginForm.value.password as string,
      device_token: [] as [],
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        const message = 'Successfully logged in';
        const action = 'Close';

        this.snackBar.open(message, action, {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          duration: 1000,
        });
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.error('Login error', err);
      },
    });
  }
}
