import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full',
  },
  {
    path: 'task-management',
    loadComponent: () => import('./pages/task-management/task-management.component'),
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create/create.component'),
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list/list.component'),
  },
];

