import { Component, OnInit, Input } from '@angular/core';
import { ListaUsuariosComponent } from '../lista-usuarios/lista-usuarios.component';

@Component({
  selector: 'app-add-edit-usuarios',
  templateUrl: './add-edit-usuarios.component.html',
  styleUrls: ['./add-edit-usuarios.component.scss']
})
export class AddEditUsuariosComponent implements OnInit {

  constructor(private service: ListaUsuariosComponent) { }

 // @Input() UserSelected:any;

  userId: any  = this.service.UserSelected;


  ngOnInit(): void {

    //this.userId = this.UserSelected;

    console.log(this.userId);

  }

  test(){

    console.log("");
  }

}
