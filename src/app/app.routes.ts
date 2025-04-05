import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['auth/login']);
const redirectLoggedInToDomain = () => redirectLoggedInTo(['/home']);

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () => import('./domains/auth/auth.routes'),
                ...canActivate(redirectLoggedInToDomain),
            },
            {
                path: 'home',
                loadComponent: () =>
                    import('./domains/home/home.component').then((c) => c.HomeComponent),
                ...canActivate(redirectUnauthorizedToLogin),
            },
            {
                path: '**',
                component: NotFoundComponent,
            },
        ],
    },
  
];
