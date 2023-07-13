import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario'; 
import { UsuariosfinalesService } from 'src/app/services/usuarios/usuariosfinales.service';

@Component({
  selector: 'app-add-edit-usuarios',
  templateUrl: './add-edit-usuarios.component.html',
  styleUrls: ['./add-edit-usuarios.component.scss']
})


export class AddEditUsuariosComponent implements OnInit {

  @Input() mission = '';
  @Input() user: Usuario = new Usuario('', '', '', '', '', '', '', '', 0);
  @Output() update = new EventEmitter();
  apiResponse: any;


  constructor(private service: UsuariosfinalesService) { }

  
  ngOnInit(): void {

    this.user = this.user;
    
  }


  onFormSubmit() {


    if (this.mission == "Agregar Usuario") {


      this.service.addNewUser(this.user).subscribe(res => {

        this.apiResponse = res;
        this.update.emit({ resUpdate: true });

      });

    }

    else if (this.mission == "Editar Usuario") {


      this.service.updateUser(this.user._id, this.user).subscribe(res => {

        this.apiResponse = res;


      });

    }

  }

}
