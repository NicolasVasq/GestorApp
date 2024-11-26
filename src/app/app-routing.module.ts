import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/autorizado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-admin',
    pathMatch: 'full'
  },
  
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'detalle',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./detalle/detalle.module').then( m => m.DetallePageModule)
  },
  {
    path: 'modificar-perfil',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/modificar-perfil/modificar-perfil.module').then(m => m.ModificarPerfilPageModule)
  },
  {
    path: 'get-users',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/get-users/get-users.module').then(m => m.GetUsersPageModule)
  },

  {
    path: 'event-detail',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./event-detail/event-detail.module').then( m => m.EventDetailPageModule)
  },
  
  {
    path: 'qr-modal',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./qr-modal/qr-modal.module').then( m => m.QrModalPageModule)
  },
  {
    path: 'eventos-registrados',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/eventos-registrados/eventos-registrados.module').then( m => m.EventosRegistradosPageModule)
  },
  {
    path: 'pages/agregar',
    loadChildren: () => import('./pages/agregar/agregar.module').then(m => m.AgregarPageModule)
  },
  {
    path: 'pages/actualizar/:id',
    loadChildren: () => import('./pages/actualizar/actualizar.module').then( m => m.ActualizarPageModule)
  },
  {
    path: 'eliminar/:id',
    loadChildren: () => import('./pages/eliminar/eliminar.module').then( m => m.EliminarPageModule)
  },
  {
    path: 'registrar-admin',
    loadChildren: () => import('./pages/registrar-admin/registrar-admin.module').then( m => m.RegistrarAdminPageModule)
  },
  {
    path: 'login-admin',
    loadChildren: () => import('./pages/login-admin/login-admin.module').then( m => m.LoginAdminPageModule)
  },
  {
    path: 'asistentes',
    loadChildren: () => import('./asistentes/asistentes.module').then( m => m.AsistentesPageModule)
  },
  {
    path: 'lista-event',
    loadChildren: () => import('./lista-event/lista-event.module').then( m => m.ListaEventPageModule)
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./pages/contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
