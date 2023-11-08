import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000'; // Replace with the actual base URL of your backend API

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
