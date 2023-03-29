import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-condominios',
  templateUrl: './lista-condominios.component.html',
  styleUrls: ['./lista-condominios.component.scss']
})
export class ListaCondominiosComponent implements OnInit {

  ModalTitle: string = '';
  taskMission: boolean = true;
  condosGroupForm!: FormGroup;
  condominio: string = '';

  constructor(private condosInfo: FormBuilder) { }

  ngOnInit(): void {

    this.condosGroupForm = this.condosInfo.group({

      condominio: ['', Validators.required]

    });

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
