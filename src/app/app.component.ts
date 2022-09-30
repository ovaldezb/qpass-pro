import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qr_pro_JS';
  componente: string = '';
  
  activeTask(componente:string){

    componente = '<app-agenda></app-agenda>';

  }

}
