import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  user: any = {
    email: '', // Initialize with an empty string
    password: '',
    
  };
  constructor(private authService: AuthService) {}

  onSubmit() {
    
    // Handle form submission here (e.g., send a POST request to your server)
    const userData = {
      email: this.user.email,
      password: this.user.password,
    };
    console.log(userData);
    this.authService.signin(userData).subscribe(
      
      (response) => {
        console.log('Signin successful', response);
        // Handle success, e.g., show a success message or navigate to another page.
      },
      (error) => {
        console.error('Signin failed', error);
        // Handle errors, e.g., show an error message to the user.
      }
    );
  }
}


