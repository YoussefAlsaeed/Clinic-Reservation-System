import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user: any = {
    email: '',
    name: '',
    password: '',
    type: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const userData = {
      email: this.user.email,
      name: this.user.name,
      password: this.user.password,
      type: this.user.type,
    };

    console.log(userData);

    this.authService.signup(userData).subscribe(
      (response) => {
        console.log('Signup successful', response);
        alert('Signup successful'); 
        this.router.navigate(['/signin']);
      },
      (error) => {
        console.error('Signup failed', error);
        alert('Signup failed. Please try again.'); 
      }
    );
  }
}
