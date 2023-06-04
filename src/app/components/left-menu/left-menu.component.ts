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
  user: any;
  ngOnInit(): void {
    this.getUserDetails();
  }

  private getUserDetails() {
    Auth.currentUserInfo().then((user: any) => {
      this.user = user;
      if (user) {
        console.log(user);
      } else {
        this.router.navigate(['/sign-in']);
      }
    });
  }
  signOutWithCognito() {
    Auth.signOut().then(() => {
      this.router.navigate(['/sign-in']);
    });
  }
}
