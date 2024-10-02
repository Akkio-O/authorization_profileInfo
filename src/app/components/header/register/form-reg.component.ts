import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

type FormData = {
	id: string;
	label: string;
	type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'select' | 'textarea';
	name: string;
	options?: { value: string; label: string }[];
};

@Component({
	selector: 'form-reg',
	standalone: true,
	imports: [RouterLink, ReactiveFormsModule, CommonModule],
	styleUrls: ['../../../styles/formStyle.scss'],
	templateUrl: './form-reg.component.html',
})
export class RegisterComponent {
	registerForm!: FormGroup;
	error: string | null = '';
	succes: string | null = '';

	fields: FormData[] = [
		{ id: 'email', label: '* Email', type: 'email', name: 'email' },
		{ id: 'password', label: '* Пароль', type: 'password', name: 'password' },
		{ id: 'confirm_password', label: '* Подтверждение пароля', type: 'password', name: 'confirm_password', },
		{ id: 'name', label: '* Имя', type: 'text', name: 'name' },
		{ id: 'surname', label: '* Фамилия', type: 'text', name: 'surname' },
		{ id: 'phone', label: '* Телефон', type: 'tel', name: 'phone' },
		{ id: 'birthdate', label: 'Дата рождения', type: 'date', name: 'birthdate', },
		{
			id: 'gender', label: '* Пол', type: 'select', name: 'gender', options:
				[
					{ value: '', label: 'Выберите пол' },
					{ value: 'male', label: 'Мужской' },
					{ value: 'female', label: 'Женский' },
				],
		},
		{ id: 'city', label: 'Город проживания', type: 'text', name: 'city' },
		{ id: 'additional_info', label: 'Дополнительная информация', type: 'textarea', name: 'additional_info' },
	];

	constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
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
			this.authService.register(data).subscribe(
				(registrationSuccessful) => {
					if (registrationSuccessful) {
						this.error = null;
						this.succes = 'Вы успешно зарегистрированы';
						setTimeout(() => {
							this.router.navigate(['/login']);
						}, 1000);
					} else {
						this.error = 'Уже существует данный аккаунт';
					}
				},
				(error) => {
					console.error('Ошибка регистрации:', error);
					this.error = 'Ошибка регистрации';
				}
			);
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
