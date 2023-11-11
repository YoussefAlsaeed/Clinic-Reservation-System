import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { NotificationsService } from 'src/app/notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  doctorId: any;
  username:any;
  dateInput: string = '';
  timeInput: string = '';
  slots: any[] = [];
  notifications: any[] = [];
  popup:boolean = false;

  constructor(private service: DoctorService, private route: ActivatedRoute,private notificationService: NotificationsService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doctorId = params['doctorId'];
      this.username = params['username'];
    });
    console.log(this.doctorId);
    this.fetchSlots();
    this.fetchNotifications();
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
          //show an error message to the user
        }
      );
    } else {
      alert('Please enter date and time.');
    }
  }
  clickNotification()
  {
      if(this.popup === true)
      {
        this.popup=false;
      }
      else
      {
        this.popup=true;
        this.fetchNotifications();

      } 
  }
  fetchNotifications(): void {
    this.popup=true;
    this.notificationService.getEventsForDoctor(1).subscribe(
      (notifications) => {
        
        this.notifications = notifications;
        console.log(this.notifications);
        // You can add additional logic to check unread messages and update the icon
      },
      (error) => {
        console.error('Error fetching notifications:', error);
        // Handle the error
      }
    );
  }
  closePopup() {
    // Set popup to false to hide it
    this.popup = false;
  }
}
