import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-home-page',
  templateUrl: './patient-home-page.component.html',
  styleUrls: ['./patient-home-page.component.css']
})
export class PatientHomePageComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  patientId: any;
  username: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = params['patientId'];
      this.username = params['username'];
    });
  }

  bookAppointment() {
    const pId=this.patientId;
    const name=this.username;
    // Navigate to the "appointment" route with parameters
    this.router.navigate(['/patient/dashboard', pId, name]);

  }
}

