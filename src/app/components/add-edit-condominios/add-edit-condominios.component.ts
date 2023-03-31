import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CondominiosService } from 'src/app/services/condominios/condominios.service';


@Component({
  selector: 'app-add-edit-condominios',
  templateUrl: './add-edit-condominios.component.html',
  styleUrls: ['./add-edit-condominios.component.scss']
})
export class AddEditCondominiosComponent implements OnInit {

  @Input() mission = ''; 
  @Input() condo: any;

  condosGroupForm!: FormGroup;
  apiResponse: any;
  apiRequest: any;
  taskMission: boolean = true;
  listaCondos: any;
  
  
  
  constructor(private condosInfo: FormBuilder,
              private service: CondominiosService,
           
              ) { }

  ngOnInit(): void {

    console.log(this.condo);
    console.log(this.mission);
    
    if (this.mission == "Editar Condominio"){

      console.log("entra aqui")

      this.condosGroupForm = this.condosInfo.group({

        condoId: [this.condo["id"], Validators.required],
        condominio: [this.condo["Condominio"], Validators.required],
        direccion: [this.condo["Direccion"], Validators.required]

      });


    }
    else if (this.mission == "Agregar Condominio"){

    this.condosGroupForm = this.condosInfo.group({

      condoId: ['', Validators.required],
      condominio: ['', Validators.required],
      direccion: ['', Validators.required]

    });
    
    }   
    

  }



  onFormSubmit() {


    this.apiRequest = {"Condominio": this.condosGroupForm.value.condominio,
                       "Direccion": this.condosGroupForm.value.direccion 
                      }

    console.log(this.apiRequest); 

    this.service.addNewCondo(this.apiRequest).subscribe(res => {

      this.apiResponse = res;
      console.log(this.apiResponse);    

    });


    this.condosGroupForm.reset();
  

  }

  closeModal() {


    this.condosGroupForm.reset();
    this.taskMission = false;
    

  }

  refreshCondos() {

    this.service.getCondos().subscribe(data => {

      this.listaCondos = data;

    });
  }


}
