import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-profile-user',
	standalone: true,
	imports: [CommonModule],
	styleUrl: '../../styles/profileStyle.scss',
	templateUrl: './profile-user.component.html',
})
export class ProfileUserComponent implements OnInit {
	constructor(private authService: AuthService, private router: Router) { }
	otherData: Array<{ key: string, value: any }> = [];
	fullName: string = '';

	keyMappings: any = {
		email: 'Email: ',
		phone: 'Телефон: ',
		birthdate: 'Дата рождения: ',
		gender: (value: string) => 'Пол: ' + (value === 'male' ? 'Мужской' : 'Женский'),
		city: 'Город: ',
		additional_info: 'Дополнительная информация: ',
	};
	ngOnInit() {
		const data = localStorage.getItem('userData');
		if (data) {
			try {
				const parsedData = JSON.parse(data);
				this.otherData = Object.keys(parsedData)
					.filter(key => key !== 'password' && key !== 'confirm_password')
					.map(key => ({
						key,
						value: key === 'name' || key === 'surname' ? parsedData[key] : parsedData[key],
					}));

				const nameParts = [parsedData.name, parsedData.surname].filter(Boolean);
				this.fullName = nameParts.join(' ');
			} catch (error) {
				console.error('Ошибка при разборе JSON:', error);
			}
		} else {
			console.log('Нет данных в localStorage.');
		}
	}
	formatEntry(key: string, value: any): string {
		const mapping = this.keyMappings[key];
		return typeof mapping === 'function' ? mapping(value)
			: mapping ? mapping + value : null;
	}
	logout() {
		this.authService.logout().subscribe(() => {
			this.router.navigate(['/login']);
		}, error => {
			console.error('Ошибка выхода:', error);
		});
	}
}