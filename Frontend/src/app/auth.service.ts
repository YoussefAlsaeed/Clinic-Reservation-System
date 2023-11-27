import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl; 
  constructor(private http: HttpClient) {}

  signup(data: any) {
    const url = `${this.baseUrl}/users/signup`;
    return this.http.post(url, data);
  }
  signin(data: any) {
    const url = `${this.baseUrl}/users/signin`;
    return this.http.post(url, data);
  }
}