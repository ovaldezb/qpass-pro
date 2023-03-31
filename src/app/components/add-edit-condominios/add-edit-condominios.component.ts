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
  
  condosGroupForm!: FormGroup;
  apiResponse: any;
  apiRequest: any;
  taskMission: boolean = true;

  constructor(private condosInfo: FormBuilder,
              private service: CondominiosService
              ) { }

  ngOnInit(): void {

    this.condosGroupForm = this.condosInfo.group({

      condominio: ['', Validators.required],
      direccion: ['', Validators.required]

    });

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

}
