import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


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

  constructor(
    private authenticationService : AuthenticationServiceService,
    private router : Router
    ){}

  formSubmitted : boolean = false;

  token : any;
  refrechToken : string = '';

  request : any;

  login(){
    
    this.formSubmitted = true;

    if(this.authenticationRequestForm.valid){
      const authenticationRequest : AuthenticationRequest = {
        username : this.authenticationRequestForm.value.username,
        password : this.authenticationRequestForm.value.password
      }

      this.authenticationService.authenticate(authenticationRequest).subscribe(
        authenticationResponse => {

          this.token = authenticationResponse.token;
          // this.token = authenticationResponse.token;
          // this.refrechToken = authenticationResponse.refrechToken;
          // console.log("l authentification est bonne");
          // console.log("token : ", this.token);
          // console.log("refrech token : ", this.refrechToken); 

          // const header = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
          // console.log("HEADER : ", header);

        
          const decodedToken = jwtDecode(this.token);
          console.log("decode token : ",decodedToken)
          const username = decodedToken.sub
          console.log("username : ", username)


          localStorage.setItem('token', this.token);

          console.log("locale storage : ", localStorage.getItem('token'));

          this.router.navigate(['/logout']);
        
          // console.log("HEADER : ", authenticationResponse.headers)
        }
      )
    }
  }
}
