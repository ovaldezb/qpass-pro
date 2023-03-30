import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lista-condominios',
  templateUrl: './lista-condominios.component.html',
  styleUrls: ['./lista-condominios.component.scss']
})
export class ListaCondominiosComponent implements OnInit {

  ModalTitle: string = '';
  taskMission: boolean = true;

  condominio: string = '';
  direccion: string = '';

  constructor() { }

  ngOnInit(): void {


  }


  closeModal() {

    this.taskMission = false;
    //this.refreshUsers();

  }

  agregarCondo(){

    this.ModalTitle = "Agregar Condominio";

    this.taskMission = true;
  }

}
