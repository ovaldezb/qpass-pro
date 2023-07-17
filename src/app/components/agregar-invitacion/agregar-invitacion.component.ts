import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Invitacion } from 'src/app/models/invitacion';
import { InvitacionesService } from 'src/app/services/invitaciones/invitaciones.service';
import { Global } from '../../services/global';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-agregar-invitacion',
  templateUrl: './agregar-invitacion.component.html',
  styleUrls: ['./agregar-invitacion.component.scss'],
  providers: [InvitacionesService],
})
export class AgregarInvitacionComponent implements OnInit {

  @Input() invitacion : Invitacion=new Invitacion("", "","",0,"","","", new Date(),0, "","",false,'','',new Date(),false,false,0);
  @Output() cancelStatus = new EventEmitter();
  public action:String="Guardar";
  public isQR:boolean=false;
  public title:string="Nueva Invitación";
  public user_attributes: any;
  private grupo:string='';
  constructor(private invitacionService: InvitacionesService) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.action = Global.GUARDAR
    this.isQR = false;
    //console.log(this.invitacion);
    if(this.invitacion._id !== ''){
      this.action = Global.ACTUALIZAR;
      this.title="Actualizar Invitación";
      this.isQR = true;
      const inv = [{
        'anfitrion':this.invitacion.anfitrion,
        'invitado':this.invitacion.nombreInvitado,
        'fechaEvento':this.invitacion.fechaEvento
      }];
      
    }
  }

  private getUserDetails() {
    Auth.currentAuthenticatedUser()
      .then((user: any) => {
        this.user_attributes = user.attributes;
        console.log(this.user_attributes);
        this.invitacion.anfitrion = this.user_attributes.given_name +' '+this.user_attributes.family_name;
        this.grupo=user.signInUserSession.accessToken.payload['cognito:groups'];
      })
      .catch((err) => {
        alert(err.message || JSON.stringify(err));
      });
  }
  
  agregarInvitacion():void{
    if(this.action===Global.GUARDAR){
      Swal.fire({
        title:'Desea agregar ésta Invitación?',
        showCancelButton:true,
        confirmButtonText:Global.AGREGAR
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
        confirmButtonText:Global.ACTUALIZAR
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
    this.invitacion = new Invitacion("", "","",0,"","","", new Date(),0, "","",false,'','',new Date(),false, false, 0);
    this.cancelStatus.emit({load:false});
  }
}
