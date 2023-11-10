import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';

import { DoctorhomepageComponent } from './doctorhomepage/doctorhomepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
//import { CreateSlotComponent } from '../app/doctor/create-slot/create-slot.component'
//import { SlotService } from '../app/doctor/slot.service';

import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,

    DoctorhomepageComponent,
 
    //CreateSlotComponent

    HomePageComponent,
    NavbarComponent,
    

   
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
   
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  ],
  //providers: [SlotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
