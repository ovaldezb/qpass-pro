import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './components/agenda/agenda.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListaInvitacionesComponent } from './components/lista-invitaciones/lista-invitaciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CondominiosComponent } from './components/condominios/condominios.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { BulkUsersComponent } from './components/bulk-users/bulk-users.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeGuard } from './guards/home.guard';

const routes: Routes = [
  { path: '', component: SignInComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: 'home', component: LayoutComponent, canActivate: [HomeGuard] },
  { path: 'directorio', component: AgendaComponent, canActivate: [HomeGuard] },
  {
    path: 'invitaciones',
    component: ListaInvitacionesComponent,
    canActivate: [HomeGuard],
  },
  { path: 'usuario', component: UsuarioComponent, canActivate: [HomeGuard] },
  { path: 'Usuarios', component: UsuariosComponent, canActivate: [HomeGuard] },
  {
    path: 'condominios',
    component: CondominiosComponent,
    canActivate: [HomeGuard],
  },

  { path: '**', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'bulk-users', component: BulkUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
