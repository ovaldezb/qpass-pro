import { Component, OnInit } from '@angular/core';
import { CondominiosService } from 'src/app/services/condominios/condominios.service';
import { Condominio } from 'src/app/models/condominio';

@Component({
  selector: 'app-lista-condominios',
  templateUrl: './lista-condominios.component.html',
  styleUrls: ['./lista-condominios.component.scss'],
})
export class ListaCondominiosComponent implements OnInit {
  ModalTitle: string = '';
  taskMission: boolean = false;
  condominios: Condominio[] = [];
  newCondominio: Condominio = new Condominio('', '', '', 0);
  apiResponse: any;

  constructor(private service: CondominiosService) {}

  ngOnInit(): void {
    this.refreshCondos();
  }

  agregarCondo() {
    this.newCondominio = new Condominio('', '', '', 0);
    this.taskMission = true;
    this.ModalTitle = 'Agregar Condominio';
  }

  editarCondo(condo: any) {
    this.newCondominio = condo;
    this.taskMission = true;
    this.ModalTitle = 'Editar Condominio';
  }

  eliminarCondo(condo: any) {
    this.taskMission = true;
    this.ModalTitle = 'Eliminar Condominio';

    if (confirm('Estas Seguro?')) {
      this.service.deleteCondominio(condo).subscribe((res) => {
        this.apiResponse = res;
        this.refreshCondos();
      });
    }
  }

  closeModal() {
    this.refreshCondos();
    this.taskMission = false;
  }

  refreshCondos() {
    this.service.getCondominios().subscribe((data) => {
      this.condominios = data;
    });
  }

  respuestaUpdate(event: boolean) {
    //console.log(event);

    this.refreshCondos();
  }
}
