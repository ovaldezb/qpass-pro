import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss'],
})
export class ListaUsuarioComponent implements OnInit {
  public isAdd: boolean = false;
  public isUpdate: boolean = false;
  public isDelete: boolean = false;
  public isList: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  addUser(): void {
    this.isAdd = true;
    this.isList = false;
    //console.log('Agregar usuario');
  }
}
