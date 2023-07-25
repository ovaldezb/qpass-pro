import { Component, OnInit } from '@angular/core';
import { UsuariosfinalesService } from 'src/app/services/usuarios/usuariosfinales.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {
  ModalTitle: string = '';
  taskMission: boolean = false;
  usuariosFinales: Usuario[] = [];
  newUsuario: Usuario = new Usuario('', '', '', '', '', '', '', '', 0);
  apiResponse: any;

  constructor(private service: UsuariosfinalesService) {}

  ngOnInit(): void {
    this.refreshUsers();
  }

  addUserClick() {
    this.newUsuario = new Usuario('', '', '', '', '', '', '', '', 0);
    this.taskMission = true;
    this.ModalTitle = 'Agregar Usuario';
  }

  editUserClick(user: any) {
    this.ModalTitle = 'Editar Usuario';
    this.newUsuario = user;
    this.taskMission = true;
  }

  respuestaUpdate(event: boolean) {
    //console.log(event);

    this.refreshUsers();
  }

  eliminarUser(user: any) {
    this.taskMission = true;
    this.ModalTitle = 'Eliminar Condominio';

    if (confirm('Estas Seguro?')) {
      this.service.deleteUser(user).subscribe((res) => {
        this.apiResponse = res;
        this.refreshUsers();
      });
    }
  }

  refreshUsers() {
    this.service.getUsers().subscribe((data) => {
      this.usuariosFinales = data;
    });
  }

  closeModal() {
    this.refreshUsers();
    this.taskMission = false;
  }
}
