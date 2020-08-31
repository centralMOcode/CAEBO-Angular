import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/caebo.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("//localhost:5000/api/users");
  }
}
