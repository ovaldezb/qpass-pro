import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {
  constructor(private router: Router) {}
  user_attributes: any;
  ngOnInit(): void {
    this.getUserDetails();
  }

  private getUserDetails() {
    Auth.currentUserInfo()
      .then((user: any) => {
        this.user_attributes = user.attributes;

        if (user.attributes.picture.includes('fbsbx'))
          this.user_attributes.picture = JSON.parse(
            user.attributes.picture
          ).data.url;
      })
      .catch((err) => {
        alert(err.message || JSON.stringify(err));
      });
  }
  signOutWithCognito() {
    Auth.signOut().then(() => {
      this.router.navigate(['/sign-in']);
    });
  }
}
