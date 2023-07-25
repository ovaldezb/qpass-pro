import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss'],
})
export class AddUsuarioComponent implements OnInit {
  @Output() cancelItemEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    //console.log('Inicio Alta');
  }

  submit(): void {
    //console.log('Submit');
  }

  cancel(): void {
    //console.log('Se cancela el alta');
    this.cancelItemEvent.emit(false);
  }
}
