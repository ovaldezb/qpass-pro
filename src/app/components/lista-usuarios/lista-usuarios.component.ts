import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/APIv1/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})

export class ListaUsuariosComponent implements OnInit {

  public HighlightRow: number = -1;
  public ModalTitle: string = "";
  public ActivateAddEditUser: boolean = false;
  public userOperation: any = [];
  public ListaUsuarios: any = [];
  public UserSelected: any = [];

  constructor(private service: UsuariosService) { }



  ngOnInit(): void {

    this.refreshUsers();

  }

  refreshUsers() {

    this.service.getUsers().subscribe(data => {

      this.ListaUsuarios = data;
    });
  }

  selectRow(index: number): void {
    console.log('Index' + index);
    this.HighlightRow = index;
    
  }

  addUserClick(){

    this.userOperation = {
      Nombre:"", 
      Apellidos:"",
      Condominio:"",
      Direccion:""
    }
    
    this.ModalTitle = "Agregar Usuario";
    this.ActivateAddEditUser = true;

  }

  editUserClick(){

    this.ModalTitle = "Editar Usuario"
    this.userOperation = this.ListaUsuarios[this.HighlightRow]
    this.ActivateAddEditUser = true;

    this.UserSelected = this.ListaUsuarios[this.HighlightRow]

    console.log(this.HighlightRow)
    //console.log(this.ListaUsuarios[this.HighlightRow]['id'])
  }

  crearUsuario() {

  }

  closeModal() {

    this.ActivateAddEditUser = false;
    this.refreshUsers();

  }


}
