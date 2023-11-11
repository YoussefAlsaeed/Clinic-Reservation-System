import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

enum UserType {
  Doctor = 'doctor',
  Patient = 'patient',
}

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

  constructor(private authService: AuthService) {}

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
        alert('Signup successful'); // Display success message using JavaScript alert
        // Handle success, e.g., show a success message or navigate to another page.
      },
      (error) => {
        console.error('Signup failed', error);
        alert('Signup failed. Please try again.'); // Display error message using JavaScript alert
        // Handle errors, e.g., show an error message to the user.
      }
    );
  }
}
