import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/APIv1/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})

export class ListaUsuariosComponent implements OnInit {

  public HighlightRow: number = -1;

  constructor(private service: UsuariosService) { }

  ListaUsuarios: any = [];

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

}
