import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-edit-condominios',
  templateUrl: './add-edit-condominios.component.html',
  styleUrls: ['./add-edit-condominios.component.scss']
})
export class AddEditCondominiosComponent implements OnInit {

  @Input() mission = ''; 

  constructor() { }

  ngOnInit(): void {
  }


  closeModal() {




  }

}
