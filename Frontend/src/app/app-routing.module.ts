import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomePageComponent },
  //{ path: '', redirectTo: '/signup', pathMatch: 'full' },
  {path :'signin' , component:SigninComponent}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }