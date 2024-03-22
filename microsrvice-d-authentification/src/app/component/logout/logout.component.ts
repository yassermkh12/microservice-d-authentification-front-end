import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isloggin : boolean = true;

  users : User[] = [];

  constructor(
    private userService : UserService,
    private router : Router
    ){}

  token : any = localStorage.getItem('token');

  decodedToken = jwtDecode(this.token);
  username = this.decodedToken.sub

  ngOnInit(): void {
    this.getUser();
  }
  
  getUser(){
    this.userService.getUser().subscribe(
      user => {
        console.log(user);
        this.users = user;
      }
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    
  }
}
