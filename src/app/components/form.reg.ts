import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-reg',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  styleUrls: ['../styles/formStyle.scss'],
  template: ` 
  <section class="formWrapper">
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
    <h2>Регистрация</h2>
    <p *ngIf="error" class="error">{{error}}</p>
    <p *ngIf="succes" class="succes">{{succes}}</p><br>
      <div *ngFor="let field of fields">
        <label [for]="field.id">{{ field.label }}:</label><br />
        <input
          *ngIf="field.type !== 'select' && field.type !== 'textarea'"
          [type]="field.type"
          [id]="field.id"
          [formControlName]="field.name"
        />

        <select
          *ngIf="field.type === 'select'"
          [id]="field.id"
          [formControlName]="field.name"
        >
          <option *ngFor="let option of field.options" [value]="option.value">
            {{ option.label }}
          </option>
        </select>

        <textarea
          *ngIf="field.type === 'textarea'"
          [id]="field.id"
          [formControlName]="field.name"
        >
        </textarea><br />

        <div *ngIf="registerForm.get(field.name)?.invalid && registerForm.get(field.name)?.touched">
          <small *ngIf="registerForm.get(field.name)?.errors?.['required']" class="error">* {{ field.label }} обязательно</small>
          <small *ngIf="registerForm.get(field.name)?.errors?.['email']" class="error">* Неверный формат email</small>
          <small *ngIf="registerForm.get(field.name)?.errors?.['minlength']" class="error">* Пароль должен быть не менее 6 символов</small>
          <small *ngIf="registerForm.get(field.name)?.errors?.['pattern']" class="error">* Неверный формат телефона</small>
        </div>
        <small *ngIf="registerForm.hasError('notSame') && field.name === 'confirm_password' && registerForm.get('confirm_password')?.touched" class="error">* Пароли должны совпадать</small>
        </div>

      <button type="submit">Создать аккаунт</button>
      <button routerLink="/login">Войти</button>
    </form>
  </section>`,
})
export class RegisterComponent {
  registerForm!: FormGroup;
  error: string | null = '';
  succes: string | null = '';

  fields = [
    { id: 'email', label: 'Email', type: 'email', name: 'email' },
    { id: 'password', label: 'Пароль', type: 'password', name: 'password' },
    { id: 'confirm_password', label: 'Подтверждение пароля', type: 'password', name: 'confirm_password', },
    { id: 'name', label: 'Имя', type: 'text', name: 'name' },
    { id: 'surname', label: 'Фамилия', type: 'text', name: 'surname' },
    { id: 'phone', label: 'Телефон', type: 'tel', name: 'phone' },
    { id: 'birthdate', label: 'Дата рождения', type: 'date', name: 'birthdate', },
    {
      id: 'gender', label: 'Пол', type: 'select', name: 'gender', options:
        [
          { value: '', label: 'Выберите пол' },
          { value: 'male', label: 'Мужской' },
          { value: 'female', label: 'Женский' },
        ],
    },
    { id: 'city', label: 'Город проживания', type: 'text', name: 'city' },
    { id: 'additional_info', label: 'Дополнительная информация', type: 'textarea', name: 'additional_info' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]+$/)]],
      birthdate: [''],
      gender: ['', [Validators.required]],
      city: [''],
      additional_info: [''],
    }, { validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }
  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      const { confirm_password, ...data } = this.registerForm.value;
      localStorage.setItem("userData", JSON.stringify(data));
      this.error = null;
      this.succes = 'Вы успешно зарегистрированы';
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 3000)
    } else {
      console.log('Форма не валидна');
      this.error = 'Пожалуйста проверьте все поля';
      this.printErrors();
    }
  }
  private printErrors() {
    Object.keys(this.registerForm.controls).forEach((key) => {
      const controlErrors = this.registerForm.get(key)?.errors;
      if (controlErrors != null) {
        console.log('Контроль:', key, 'Ошибки:', controlErrors);
      }
    });
  }
}
