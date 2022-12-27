import { Component, OnInit } from '@angular/core';
import { Invitacion } from 'src/app/models/invitacion';
import { InvitacionesService } from 'src/app/services/invitaciones/invitaciones.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import swal from 'sweetalert2';

@Component({
  selector: 'app-lista-invitaciones',
  templateUrl: './lista-invitaciones.component.html',
  styleUrls: ['./lista-invitaciones.component.scss'],
  providers: [InvitacionesService]
})
export class ListaInvitacionesComponent implements OnInit {

  public HighlightRow: number = -1;
  public isSelected: boolean =false;
  public isAdd:boolean=false;
  public isList:boolean=true;
  public invitaciones:Invitacion[]=[];
  public invitacion:Invitacion=new Invitacion("","","",0,"","","", new Date(),0, "","",false);
  
  constructor(private _router : Router, private invitacionService: InvitacionesService) { 

  }

  ngOnInit(): void {
    this.isSelected=false;
    this.invitacionService.getInvitaciones().subscribe(
        (res)=>{
          //console.log(res);
          if(res.length > 0){
            this.invitaciones = res;
            this.isList = true;
            this.isAdd = false;
          }else{
            this.isList = false;
            this.isAdd = true;
          }
        }
      );
  }

  selectRow(index: number): void {
    this.HighlightRow = index;
    this.isSelected = true;
  }
  deleteInvitacion():void{
    swal.fire({
      title:'Desea eliminar esta Invitacion',
      showCancelButton:true,
      confirmButtonText:'Borrar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.invitacionService.deleteInvitacion(this.invitaciones[this.HighlightRow]._id).subscribe(res=>{
          this.loadInvitaciones();
          swal.fire('La invitación se ha eliminado correctamente');
        });
      }
    });

  }
  agregarInvitacion():void{
    this.isList = false;
    this.isAdd = true;
  }

  updateInvitacion():void{
    this.invitacion = this.invitaciones[this.HighlightRow];
    this.isList = false;
    this.isAdd = true;
  }

  cancelStatus(event:any):void{
    this.isList = true;
    this.isAdd = false;
    this.HighlightRow = -1;
    this.invitacion = new Invitacion("","","",0,"","","", new Date(),0, "","",false);
    //console.log(event);
    if(event.load){
      this.loadInvitaciones();
    }
  }

  loadInvitaciones():void{
    this.invitacionService.getInvitaciones().subscribe((res)=>{
      this.invitaciones = res;
    });
  }

}
