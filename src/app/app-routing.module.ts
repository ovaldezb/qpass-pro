import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './components/agenda/agenda.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListaInvitacionesComponent } from './components/lista-invitaciones/lista-invitaciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CondominiosComponent } from './components/condominios/condominios.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'inicio', component: LayoutComponent },
  { path:'directorio', component: AgendaComponent },
  { path:'invitaciones', component: ListaInvitacionesComponent },
  { path:'usuario', component: UsuarioComponent },
  { path:'Usuarios',component: UsuariosComponent },
  { path:'condominios', component: CondominiosComponent },
];

@NgModule(
  {
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule]
  }
)
export class AppRoutingModule { }
