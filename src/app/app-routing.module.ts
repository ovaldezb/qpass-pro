import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './components/agenda/agenda.component';
import { LayoutComponent } from './components/layout/layout.component';
import { InvitacionesComponent } from './components/invitaciones/invitaciones.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  {path:'', component: LayoutComponent},
  {path:'directorio', component: AgendaComponent},
  {path:'invitaciones', component: InvitacionesComponent},
  {path:'usuario', component: UsuarioComponent}
];

@NgModule(
  {imports: [RouterModule.forRoot(routes)], exports: [RouterModule]}
  )
export class AppRoutingModule { }
