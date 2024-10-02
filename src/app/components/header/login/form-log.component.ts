import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

type User = {
	email: string;
	password: string;
};

@Component({
	selector: 'form-log',
	standalone: true,
	imports: [FormsModule, CommonModule, RouterLink],
	styleUrls: ['../../../styles/formStyle.scss'],
	templateUrl: './form-log.component.html',
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