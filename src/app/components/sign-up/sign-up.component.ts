import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  user: User | undefined;
  isConfirm: boolean = false;
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = {} as User;
    this.isConfirm = false;
  }

  public signUpWithCognito() {
    if (this.user && this.user.email && this.user.password) {
      const user = {
        username: this.user.email,
        password: this.user.password,
        attributes: {
          email: this.user.email,
          given_name: this.user.givenName,
          family_name: this.user.familyName,
          picture:
            'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
        },
      };
      Auth.signUp(user)
        .then(() => {
          this.isConfirm = true;
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        });
    } else {
      this.displayAlert('Falta email o contraseña');
    }
  }

  public confirmSignUp() {
    if (this.user) {
      Auth.confirmSignUp(this.user.email, this.user.code, {
        forceAliasCreation: true,
      })
        .then(() => {
          this.isConfirm = true;
          this.router.navigate(['/sign-in']);
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        });
    } else {
      this.displayAlert('Falta información del usuario.');
    }
  }
  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }
}
