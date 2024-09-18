import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

type User = {
  email: string;
  password: string;
};

@Component({
  selector: 'form-log',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  styleUrls: ['../styles/formStyle.scss'],
  template: ` 
  <section class="formWrapper">
    <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
    <h2>Авторизация</h2>
    <p *ngIf="error" class="error">{{error}}</p>
    <p *ngIf="succes" class="succes">{{succes}}</p><br>
      <label for="email">Email:</label><br />
      <input type="email" id="email" name="email" [(ngModel)]="user.email" required email #email="ngModel" /><br />
      <div *ngIf="email.invalid && email.touched">
        <small *ngIf="email.errors?.['required']" class="error">Email обязателен</small>
        <small *ngIf="email.errors?.['email']" class="error">Неверный формат Email</small>
      </div>

      <label for="password">Пароль:</label><br />
      <input 
        type="password" 
        id="password" 
        name="password" 
        [(ngModel)]="user.password"
        required
        #password="ngModel" 
        minlength="6"/><br />
      <div *ngIf="password.invalid && password.touched">
        <small *ngIf="password.errors?.['required']" class="error">* Пароль обязателен</small>
        <small *ngIf="password.errors?.['minlength']" class="error">* Пароль должен быть не менее 6 символов</small>
      </div>
      <button type="button" (click)="onSubmit(loginForm)" [disabled]="loginForm.invalid">Войти</button>
      <button routerLink="/register">Создать аккаунт</button>
    </form>
  </section>
  `,
})
export class LoginComponent {
  error: string | null = '';
  succes: string | null = '';

  user: User = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.user).subscribe(
        (loginSuccessful) => {
          if (loginSuccessful) {
            this.error = null;
            this.succes = 'Вы успешно авторизованы';
            this.router.navigate(['/user']);
          } else {
            this.error = 'Логин/пароль неверные';
          }
        },
        (error) => {
          console.error('Ошибка авторизации:', error);
        }
      );
    }
  }
}