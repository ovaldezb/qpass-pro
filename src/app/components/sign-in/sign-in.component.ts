import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CognitoService } from 'src/app/services/cognito.service';

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
  newPasswordConfirm: string='';
  newPassword: string = '';
  constructor(private router: Router, private cognitoService: CognitoService) {}

  ngOnInit(): void {
    this.user = {} as User;
    
  }

  signInWithCognito() {
    if (this.user && this.user.email && this.user.password) {
      this.cognitoService
        .signIn(this.user)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        });
    }
    else{
      this.displayAlert("Por favor ingresa credenciales válidas");
    }
  }
  forgotPasswordClicked() {
    if (this.user && this.user.email) {
      this.cognitoService
        .forgotPassword(this.user)
        .then(() => {
          this.isForgotPassword = true;
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        });
    } else {
      this.displayAlert('Por favor ingresa un correo electrónico válido');
    }
  }
  newPasswordSubmit(){
    if(this.user && this.user.code && this.newPassword.trim().length!=0 && this.newPasswordConfirm.trim().length!=0 && this.newPasswordConfirm && this.newPassword===this.newPasswordConfirm){
      this.cognitoService.forgotPasswordSubmit(this.user,this.newPassword.trim())
      .then(()=>{
        this.displayAlert("Contraseña actualizada");
        this.isForgotPassword=false;
      })
      .catch((error: any) => {
        this.displayAlert(error.message);
      })
    }
    else{
      this.displayAlert("Por favor ingresa el código de verificacion y una nueva contraseña")
    }
  }
  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }
}
