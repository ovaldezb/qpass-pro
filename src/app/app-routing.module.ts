import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './components/agenda/agenda.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListaInvitacionesComponent } from './components/lista-invitaciones/lista-invitaciones.component';

const routes: Routes = [
  {path:'', component: LayoutComponent},
  {path:'directorio', component: AgendaComponent},
  {path:'usuario', component: UsuarioComponent},
  {path: 'invitaciones', component: ListaInvitacionesComponent}
];

@NgModule(
  {
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule]
  }
)
export class AppRoutingModule { }
