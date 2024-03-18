import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // authenticationRequest : AuthenticationRequest = {
  //   username : '',
  //   password : ''
  // };

  authenticationRequestForm : FormGroup = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  })

  constructor(private authenticationService : AuthenticationServiceService){}

  formSubmitted : boolean = false;

  token : String = '';
  refrechToken : String = '';

  login(){
    
    this.formSubmitted = true;

    if(this.authenticationRequestForm.valid){
      const authenticationRequest : AuthenticationRequest = {
        username : this.authenticationRequestForm.value.username,
        password : this.authenticationRequestForm.value.password
      }

      this.authenticationService.authenticate(authenticationRequest).subscribe(
        (authenticationResponse) => {
          this.token = authenticationResponse.token;
          this.refrechToken = authenticationResponse.refrechToken;
          console.log("l authentification est bonne");
          console.log("token : ", this.token);
          console.log("refrech token : ", this.refrechToken); 
        }
      )
    }
  }
}
