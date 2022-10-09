import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import  swal  from 'sweetalert2'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  public isAdd:boolean=false;
  public isUpdate:boolean=false;
  public isDelete:boolean=false;
  public isList:boolean=true;
  public usuarios:Usuario[]=[];
  public usuario:Usuario;
  public HighlightRow : number=-1;
  public action:string='Enviar';
  
  constructor() { 
    //this.usuario = new Usuario('Juan','Perez','Americas',2);
    this.usuarios.push(new Usuario('Juan','Perez','Americas',2));
    this.usuarios.push(new Usuario('Guillermo','Vazquez','Solidaridad',3));
    this.usuarios.push(new Usuario('Miguel','Contreras','Las Torres',4));
    this.usuario = new Usuario('','','',0);
  }

  ngOnInit(): void {
  }

  addUser():void{
    this.isAdd = true;
    this.isList = false;
  }

  deleteUser():void{
    if(this.HighlightRow === -1){
      swal.fire('Seleccione un renglón');
    }
    this.usuarios.splice(this.HighlightRow,1);
    this.HighlightRow = -1;
  }

  updateUser():void{
    if(this.HighlightRow === -1){
      swal.fire('Seleccione un renglón');
    }
    this.action = 'Actualizar';
    this.usuario = this.usuarios[this.HighlightRow];
    this.HighlightRow = -1;
    this.isAdd = true;
    this.isList = false;
    this.isUpdate = true;
  }

  submit():void{
    if(this.isUpdate){
      this.usuarios[this.HighlightRow] = this.usuario;
      this.usuario = new Usuario('','','',0);
    }else{
      this.usuarios.push(this.usuario);
    }
    this.isUpdate = false;
    this.isAdd = false;
    this.isList = true
    this.action = 'Enviar';
  }

  cancel():void{
    this.isAdd = false;
    this.isList = true;
  }

  editUsuario(index:number):void{
    console.log('Editar Usuario');
  }

  selectRow(index:number):void{
    console.log('Index' + index);
    this.HighlightRow = index;
  }

  /*cancelItem(event: any):void{
    console.log('En el padre, se cancela');
    console.log(event);
  }*/

}
