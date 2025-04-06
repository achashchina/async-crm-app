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
        children: [
          {
            path: 'employees',
            loadComponent: () =>
              import('./domains/employees/employees.component').then(
                (c) => c.EmployeesComponent
              ),
          },
          {
            path: 'onboarding',
            loadComponent: () =>
              import('./domains/onboarding/onboarding.component').then(
                (c) => c.OnboardingComponent
              ),
          },
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./domains/dashboard/dashboard.component').then(
                (c) => c.DashboardComponent
              ),
          },
          {
            path: 'ai-help',
            loadComponent: () =>
              import('./domains/ai-help/ai-help.component').then(
                (c) => c.AiHelpComponent
              ),
          },
          {
            path: 'knowledge-base',
            loadComponent: () =>
              import('./domains/knowledge-base/knowledge-base.component').then(
                (c) => c.KnowledgeBaseComponent
              ),
          },
        ],
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];
