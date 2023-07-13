import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  user: User | undefined;
  alertMessage: string = '';
  showAlert: boolean = false;

  isForgotPassword: boolean = false;
  newPasswordConfirm: string = '';
  newPassword: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = {} as User;
  }
  signInWithGoogle() {
    Auth.federatedSignIn({ customProvider: 'Google' })
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error: any) => {
        alert(error.message);
      });
  }
  signInWithFacebook() {
    Auth.federatedSignIn({ customProvider: 'Facebook' })
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error: any) => {
        alert(error.message);
      });
  }
  signInWithCognito() {
    if (this.user && this.user.email && this.user.password) {
      Auth.signIn(this.user.email, this.user.password)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch((error: any) => {
          alert(error.message);
        });
    } else {
      alert('Por favor ingresa credenciales válidas');
    }
  }

  forgotPasswordClicked() {
    if (this.user && this.user.email) {
      Auth.forgotPassword(this.user.email)
        .then(() => {
          this.isForgotPassword = true;
        })
        .catch((error: any) => {
          alert(error.message);
        });
    } else {
      alert('Por favor ingresa un correo electrónico válido');
    }
  }
  newPasswordSubmit() {
    if (
      this.user &&
      this.user.code &&
      this.newPassword.trim().length != 0 &&
      this.newPasswordConfirm.trim().length != 0 &&
      this.newPasswordConfirm &&
      this.newPassword === this.newPasswordConfirm
    ) {
      Auth.forgotPasswordSubmit(
        this.user.email,
        this.user.code,
        this.newPassword.trim()
      )
        .then(() => {
          alert('Contraseña actualizada');
          this.isForgotPassword = false;
        })
        .catch((error: any) => {
          alert(error.message);
        });
    } else {
      alert(
        'Por favor ingresa el código de verificacion y una nueva contraseña'
      );
    }
  }
  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }
}
