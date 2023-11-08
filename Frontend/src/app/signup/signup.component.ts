import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
enum UserType {
  Doctor = 'doctor',
  Patient = 'patient',
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  user: any = {
    email: '', // Initialize with an empty string
    name: '',
    password: '',
    type:'' // Initialize with an empty string, or set it based on user selection
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    
    // Handle form submission here (e.g., send a POST request to your server)
    const userData = {
      email: this.user.email,
      name: this.user.name,
      password: this.user.password,
      type: this.user.type // Use the value from the initialized user object
    };
    console.log(userData);
    this.authService.signup(userData).subscribe(
      
      (response) => {
        console.log('Signup successful', response);
        // Handle success, e.g., show a success message or navigate to another page.
      },
      (error) => {
        console.error('Signup failed', error);
        // Handle errors, e.g., show an error message to the user.
      }
    );
  }
}
