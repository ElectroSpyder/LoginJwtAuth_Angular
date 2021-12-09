import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions ={
   headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(userName: string, password: string):Observable<any>{
    
    return this.httpClient.post(AUTH_API + 'signin', {
      userName,
      password
    }, httpOptions);

  }

  register(userName: string, email: string, password: string): Observable<any>{

    return this.httpClient.post(AUTH_API + 'signup', {
      userName,
      password,
      email
    }, httpOptions);
  }
}
