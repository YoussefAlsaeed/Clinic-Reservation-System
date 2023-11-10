import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  doctorId: any;
  dateInput: string = '';
  timeInput: string = '';
  slots: any[] = [];

  constructor(private service: DoctorService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doctorId = params['doctorId'];
    });
    console.log(this.doctorId);
    this.fetchSlots();
  }

  fetchSlots() {
    this.service.getSlots(this.doctorId).subscribe(res => {
      this.slots = res;
      console.log(this.slots);
    });
  }

  addSlot(): void {
    if (this.dateInput && this.timeInput) {
      const dateTimeString = `${this.dateInput}T${this.timeInput}:00Z`;

      this.service.addSlot(dateTimeString, this.doctorId).subscribe(
        (response) => {
          console.log('Slot added successfully', response);
          // After adding the slot, fetch and update the slots
          this.fetchSlots();
        },
        (error) => {
          console.error('Failed to add slot', error);
          // Handle errors, e.g., show an error message to the user
        }
      );
    } else {
      alert('Please enter date and time.');
    }
  }
}
