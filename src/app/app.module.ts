import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FormsModule } from '@angular/forms';
import { AgregarInvitacionComponent } from './components/agregar-invitacion/agregar-invitacion.component';
import { ListaInvitacionesComponent } from './components/lista-invitaciones/lista-invitaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    LeftMenuComponent,
    LayoutComponent,
    NavbarComponent,
    AddUsuarioComponent,
    ListaUsuarioComponent,
    UsuarioComponent,
    AgregarInvitacionComponent,
    ListaInvitacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
