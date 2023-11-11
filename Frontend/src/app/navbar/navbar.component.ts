import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
    menuType:String ='default';
    constructor(private route:Router){}

    ngOnInit(): void {
      this.route.events.subscribe((val: any) => {
        if (val.url) {
          console.warn(val.url);
    
          if (val.url.includes('doctor')) {
            console.warn('herree');
            this.menuType = 'doctor';
          } 
          else if(val.url.includes('patient')){
            console.warn('noo');
            this.menuType='patient';
          }
        }
      });
    
  }
  toggleMenu() {
    const navList = document.querySelector('.navlist');
    navList?.classList.toggle('open');
  }
    }

