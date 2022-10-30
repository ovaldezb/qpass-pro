import { Component, OnInit, Input } from '@angular/core';
import { ListaUsuariosComponent } from '../lista-usuarios/lista-usuarios.component';

@Component({
  selector: 'app-add-edit-usuarios',
  templateUrl: './add-edit-usuarios.component.html',
  styleUrls: ['./add-edit-usuarios.component.scss']
})
export class AddEditUsuariosComponent implements OnInit {

  public userId: String = "";
  public Nombre: String = "";
  public Apellidos: String = "";
  public Condominio: String = "";
  public Direccion: String = "";
  public userCreate: any = [];

  constructor(private service: ListaUsuariosComponent) { }

 // @Input() UserSelected:any;

  userObject: any  = this.service.UserSelected;
  
  ngOnInit(): void {

    //this.userId = this.UserSelected;
    this.userId = this.userObject["id"];
    console.log("Este es el chingon " + this.userId);
    
    this.Nombre = this.userObject["Nombre"];
    this.Apellidos = this.userObject["Apellidos"];
    this.Direccion = this.userObject["Direccion"];
    this.Condominio = this.userObject["Condominio"];

    this.userCreate = this.Nombre;
    
  }

  test(){

    console.log("");
  }

}
