import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  errorMessage: string | undefined
  user: any = {
    email: '',
    password: '',
  };
  resUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    const userData = {
      email: this.user.email,
      password: this.user.password,
    };

    this.authService.signin(userData).subscribe(
      (response) => {
        this.resUser = response;
        console.log('Signin successful', response);
        const userType = this.resUser.type;
        const username = this.resUser.name;
        if (userType === 'DOCTOR') {
          const doctorId = this.resUser.ID;
          this.router.navigate(['/doctor/dashboard', doctorId, username]);
        } else if (userType === 'PATIENT') {
          const patientId = this.resUser.ID;
          this.router.navigate(['/patient/homepage', patientId, username]);
        }
      },
      (error) => {
        console.error('Signin failed', error);
        this.errorMessage = 'An error occurred during sign-in. Please try again.';
        alert(this.errorMessage); // Using JavaScript alert
      }
    );
  }
}
