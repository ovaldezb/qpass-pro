import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-condominios',
  templateUrl: './add-edit-condominios.component.html',
  styleUrls: ['./add-edit-condominios.component.scss']
})
export class AddEditCondominiosComponent implements OnInit {

  @Input() mission = ''; 
  
  condosGroupForm!: FormGroup;

  constructor(private condosInfo: FormBuilder) { }

  ngOnInit(): void {

    this.condosGroupForm = this.condosInfo.group({

      condominio: ['', Validators.required],
      direccion: ['', Validators.required]

    });

  }


  closeModal() {




  }

}
