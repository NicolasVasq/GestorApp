import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/autorizado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: '',
    canActivate: [AuthGuard], // Proteger rutas con AuthGuard
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard], // Proteger ruta
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'detalle',
    canActivate: [AuthGuard], // Proteger ruta
    loadChildren: () => import('./detalle/detalle.module').then(m => m.DetallePageModule)
  },
  {
    path: 'pages/agregar',
    canActivate: [AuthGuard], // Proteger ruta
    loadChildren: () => import('./pages/agregar/agregar.module').then(m => m.AgregarPageModule)
  },
  {
    path: 'pages/actualizar/:id',
    canActivate: [AuthGuard], // Proteger ruta
    loadChildren: () => import('./pages/actualizar/actualizar.module').then(m => m.ActualizarPageModule)
  },
  {
    path: 'eliminar/:id',
    canActivate: [AuthGuard], // Proteger ruta
    loadChildren: () => import('./pages/eliminar/eliminar.module').then(m => m.EliminarPageModule)
  },
  {
    path: 'modificar-perfil',
    canActivate: [AuthGuard], // Proteger ruta
    loadChildren: () => import('./pages/modificar-perfil/modificar-perfil.module').then(m => m.ModificarPerfilPageModule)
  },
  {
    path: 'get-users',
    canActivate: [AuthGuard], // Proteger ruta
    loadChildren: () => import('./pages/get-users/get-users.module').then(m => m.GetUsersPageModule)
  },
  {
    path: 'deta-usuarios/:nombre',
    canActivate: [AuthGuard], // Proteger ruta
    loadChildren: () => import('./pages/deta-usuarios/deta-usuarios.module').then(m => m.DetaUsuariosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
