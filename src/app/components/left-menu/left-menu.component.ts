import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  constructor(private router:Router, private cognitoService: CognitoService) { }

  ngOnInit(): void {
  }
  
  private getUserDetails(){
    this.cognitoService.getUser()
    .then((user:any)=>{
      if(user){
        console.log(user);

      }
      else{
        this.router.navigate(['/sign-in']);
      }
    })
    
  }
  signOutWithCognito(){
    this.cognitoService.signOut()
    .then(()=>{
      this.router.navigate(["/sign-in"])
    })
  }
}
