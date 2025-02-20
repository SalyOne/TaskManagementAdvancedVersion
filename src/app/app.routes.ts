import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks', loadChildren: () => import('./features/task/task.routes').then(m => m.TaskRoutes) }
];
