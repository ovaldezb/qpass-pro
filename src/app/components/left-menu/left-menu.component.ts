import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { CondominiosService } from 'src/app/services/condominios/condominios.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  providers: [CondominiosService],
})
export class LeftMenuComponent implements OnInit {
  constructor(
    private router: Router,
    private condominiosService: CondominiosService
  ) {}
  user_attributes: any;
  condominio: any;
  ngOnInit(): void {
    this.getUserDetails();
    //this.condominiosService.getCondominio().subscribe();
  }

  private getUserDetails() {
    Auth.currentUserInfo()
      .then((user: any) => {
        this.user_attributes = user.attributes;
        //console.log(user);
        if (user.attributes.picture.includes('fbsbx'))
          this.user_attributes.picture = JSON.parse(
            user.attributes.picture
          ).data.url;
      })
      .catch((err) => {
        alert(err.message || JSON.stringify(err));
      });
    Auth.currentSession().then((session: any) => {
      var idCondominio = String(
        session.idToken.payload['cognito:groups'][0]
      ).split('_')[1];

      this.condominiosService.getCondominio(idCondominio).subscribe((data) => {
        this.condominio = data;
      });
      // var sessionIdInfo =  jwtDecode(session.getIdToken().jwtToken);
      // //console.log(sessionIdInfo['cognito:groups']);
    });
  }
  signOutWithCognito() {
    Auth.signOut().then(() => {
      this.router.navigate(['/sign-in']);
    });
  }
}
