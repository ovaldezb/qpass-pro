import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Invitacion } from 'src/app/models/invitacion';
import { InvitacionesService } from 'src/app/services/invitaciones/invitaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-invitacion',
  templateUrl: './agregar-invitacion.component.html',
  styleUrls: ['./agregar-invitacion.component.scss'],
  providers: [InvitacionesService]
})
export class AgregarInvitacionComponent implements OnInit {

  @Input() invitacion : Invitacion=new Invitacion("", "","",0,"","","", new Date(),0, "","",false);
  @Output() cancelStatus = new EventEmitter();
  public action:String="Guardar";
  constructor(private invitacionService: InvitacionesService) { }

  ngOnInit(): void {
    console.log(this.invitacion._id);
    if(this.invitacion._id !== ''){
      this.action = 'Actualizar';
    }
  }

  agregarInvitacion():void{
    if(this.action==='Guardar'){
      Swal.fire({
        title:'Desea agregar ésta Invitación?',
        showCancelButton:true,
        confirmButtonText:'Agregar'
      }).then((result)=>{
        if(result.isConfirmed){
          this.invitacionService.addInvitation(this.invitacion).subscribe((res)=>{
            this.cancelStatus.emit({load:true});
          });
        }
      });
    }else{
      Swal.fire({
        title:'Desea actualizar ésta Invitacion?',
        showCancelButton:true,
        confirmButtonText:'Actualizar'
      }).then((result)=>{
        if(result.isConfirmed){
          this.invitacionService.updateInvitacion(this.invitacion._id,this.invitacion).subscribe((res)=>{
            this.cancelStatus.emit({load:true});
          });
        }
      });
    }
  }

  cancelAction():void{
    this.invitacion = new Invitacion("", "","",0,"","","", new Date(),0, "","",false);
    this.cancelStatus.emit({load:false});
  }
}
