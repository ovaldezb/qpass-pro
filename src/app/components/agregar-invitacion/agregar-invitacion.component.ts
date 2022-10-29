import { Component, OnInit } from '@angular/core';
import { Invitacion } from 'src/app/models/invitacion';

@Component({
  selector: 'app-agregar-invitacion',
  templateUrl: './agregar-invitacion.component.html',
  styleUrls: ['./agregar-invitacion.component.scss']
})
export class AgregarInvitacionComponent implements OnInit {

  public invitacion:Invitacion=new Invitacion("", "Omar","Invitacion",10,"","","", new Date(),0, "","area común",true);
  constructor() { }

  ngOnInit(): void {
  }

  agregarInvitacion():void{
    console.log(this.invitacion);
  }
}
