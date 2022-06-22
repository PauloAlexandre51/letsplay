import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'quadra-edit/:id',
    loadChildren: () => import('./quadra-edit/quadra-edit.module').then(m => m.QuadraEditPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'agendamento-quadra/:id',
    loadChildren: () => import('./agendamento-quadra/agendamento-quadra.module').then(m => m.AgendamentoQuadraPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./home-admin/home-admin.module').then(m => m.HomeAdminPageModule),
    canActivate: [AuthGuardService]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
