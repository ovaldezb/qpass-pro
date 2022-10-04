import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InvitacionesComponent } from './components/invitaciones/invitaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    LeftMenuComponent,
    LayoutComponent,
    NavbarComponent,
    InvitacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
