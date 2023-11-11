import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
    menuType:String ='default';
    loggedIn:boolean=false;

    constructor(private route:Router){}

    ngOnInit(): void {
      this.route.events.subscribe((val: any) => {
        if (val.url) {
          console.warn(val.url);
    
          if (val.url.includes('doctor')) {
            console.warn('herree');
            this.menuType = 'doctor';
            this.loggedIn = true;
          } 
          else if(val.url.includes('patient')){
            console.warn('noo');
            this.menuType='patient';
            this.loggedIn=true;
          }
          console.log(this.loggedIn)
        }
      });
      
    
  }
  toggleMenu() {
    const navList = document.querySelector('.navlist');
    navList?.classList.toggle('open');
  }
  login(){
    this.loggedIn=true;
    console.log(this.loggedIn);

  }
  logout(){
    this.loggedIn=false;
  }

  
}

