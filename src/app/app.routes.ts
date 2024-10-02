import { Routes } from '@angular/router';
import { RegisterComponent } from './components/header/register/form-reg.component';
import { LoginComponent } from './components/header/login/form-log.component';
import { ProfileUserComponent } from './components/section/profile-user.component';
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
