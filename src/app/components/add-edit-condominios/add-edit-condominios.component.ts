import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Condominio } from 'src/app/models/condominio';
import { CondominiosService } from 'src/app/services/condominios/condominios.service';

@Component({
  selector: 'app-add-edit-condominios',
  templateUrl: './add-edit-condominios.component.html',
  styleUrls: ['./add-edit-condominios.component.scss'],
})
export class AddEditCondominiosComponent implements OnInit {
  @Input() mission = '';
  @Input() condo: Condominio = new Condominio('', '', '', 0);
  @Output() update = new EventEmitter();

  //condosGroupForm!: FormGroup;
  apiResponse: any;
  apiRequest: any;

  constructor(private service: CondominiosService) {}

  ngOnInit(): void {
    this.condo = this.condo;

    if (this.mission == 'Editar Condominio') {
      console.log('entra Editar');

      /*  this.condosGroupForm = this.condosInfo.group({

        condoId: [this.condo["id"], Validators.required],
        condominio: [this.condo["Condominio"], Validators.required],
        telefono: [this.condo["Telefono"], Validators.required],
        direccion: [this.condo["Direccion"], Validators.required]

      });*/
    } else if (this.mission == 'Agregar Condominio') {
      //this.condo = new Condominio('', '', '', 0);
    }

    //this.condosGroupForm.reset();
  }

  onFormSubmit() {
    console.log(this.mission);

    if (this.mission == 'Agregar Condominio') {
      this.service.addCondominio(this.condo).subscribe((res) => {
        this.apiResponse = res;
        this.update.emit({ resUpdate: true });
      });
    } else if (this.mission == 'Editar Condominio') {
      console.log('editar');

      this.service
        .updateCondominio(this.condo._id, this.condo)
        .subscribe((res) => {
          this.apiResponse = res;
        });
    }
  }
}
