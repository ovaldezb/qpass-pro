import { Component, OnInit } from '@angular/core';
import { Invitacion } from 'src/app/models/invitacion';
import { InvitacionesService } from 'src/app/services/invitaciones/invitaciones.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-lista-invitaciones',
  templateUrl: './lista-invitaciones.component.html',
  styleUrls: ['./lista-invitaciones.component.scss'],
  providers: [InvitacionesService]
})
export class ListaInvitacionesComponent implements OnInit {

  public isAdd:boolean=false;
  public isList:boolean=true;
  public invitaciones:Invitacion[]=[];
  public invitacion:Invitacion=new Invitacion("","Omar","Invitacion",10,"","","", new Date(),0, "","",false);
  
  constructor(private _router : Router, private invitacionService: InvitacionesService) { 

  }

  ngOnInit(): void {
    this.invitacionService.getInvitaciones().subscribe(
        (res)=>{
          console.log(res);
        }
      );
    if(this.invitaciones.length === 0){
      this.isList = false;
      this.isAdd = true;
    }
  }

  agregarInvitacion():void{

  }

}
