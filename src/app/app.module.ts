import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

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
import { ReactiveFormsModule } from '@angular/forms';

import { UsuariosComponent } from './components/usuarios/usuarios.component';

//Servicios -> Models
import { UsuariosService } from './APIv1/usuarios.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { AddEditUsuariosComponent } from './components/add-edit-usuarios/add-edit-usuarios.component';
import { QRCodeModule } from 'angular2-qrcode';
import { CondominiosComponent } from './components/condominios/condominios.component';
import { ListaCondominiosComponent } from './components/lista-condominios/lista-condominios.component';
import { AddEditCondominiosComponent } from './components/add-edit-condominios/add-edit-condominios.component';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { ApiRestInterceptor } from './interceptors/api-rest.interceptor';
import { BulkUsersComponent } from './components/bulk-users/bulk-users.component';

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
    ListaInvitacionesComponent,
    UsuariosComponent,
    ListaUsuariosComponent,
    AddEditUsuariosComponent,
    CondominiosComponent,
    ListaCondominiosComponent,
    AddEditCondominiosComponent,

    SignUpComponent,
    SignInComponent,
    MessageModalComponent,,
    BulkUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
  ],
  providers: [UsuariosService, CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiRestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
