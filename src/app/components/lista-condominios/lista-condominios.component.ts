import { Component, OnInit } from '@angular/core';
import { CondominiosService } from 'src/app/services/condominios/condominios.service';

@Component({
  selector: 'app-lista-condominios',
  templateUrl: './lista-condominios.component.html',
  styleUrls: ['./lista-condominios.component.scss']
})


export class ListaCondominiosComponent implements OnInit {

  ModalTitle: string = '';
  taskMission: boolean = false;
  listaCondos: any;
  condominio: any;
  direccion: string = '';
  


  constructor(private service: CondominiosService) { }


  ngOnInit(): void {

    this.refreshCondos();

  }


  agregarCondo(){

    
    this.ModalTitle = "Agregar Condominio";
    this.taskMission = true;
    //this.refreshCondos();

  }

  editarCondo(condo: any){

    this.condominio = condo;
    this.taskMission = true;
    this.ModalTitle = "Editar Condominio";
    

  }

  closeModal() {


    this.refreshCondos();
    this.taskMission = false;


  }

  refreshCondos() {

    this.service.getCondos().subscribe(data => {

      this.listaCondos = data;

    });
  }


}
