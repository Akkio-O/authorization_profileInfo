import { Routes } from '@angular/router';
import { RegisterComponent } from './components/form.reg';
import { LoginComponent } from './components/form.log';
import { ProfileUserComponent } from './components/profile.user';
import { AuthGuard } from './components/auth.guard';

export const routes: Routes = [
    {
        path: 'register',
        title: 'Регистрация',
        component: RegisterComponent
    },
    {
        path: 'login',
        title: 'Авторизация',
        component: LoginComponent
    },
    {
        path: 'user',
        title: 'Данные пользователя',
        component: ProfileUserComponent,
        canActivate: [AuthGuard]
    }
];
