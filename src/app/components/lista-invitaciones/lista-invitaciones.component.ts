import { Component, OnInit } from '@angular/core';
import { Invitacion } from 'src/app/models/invitacion';

@Component({
  selector: 'app-lista-invitaciones',
  templateUrl: './lista-invitaciones.component.html',
  styleUrls: ['./lista-invitaciones.component.scss']
})
export class ListaInvitacionesComponent implements OnInit {

  public isAdd:boolean=false;
  public isList:boolean=true;
  public invitaciones:Invitacion[]=[];
  public invitacion:Invitacion=new Invitacion("","Omar","Invitacion",10,"","","", new Date(),0, "","",false);
  constructor() { }

  ngOnInit(): void {
    if(this.invitaciones.length === 0){
      this.isList = false;
      this.isAdd = true;
    }
  }

  agregarInvitacion():void{

  }

}
