import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, User } from '../../models/caebo.constants';
import { API } from 'src/shared/api/api.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  getUsers(): Observable<ApiResponse<User[]>> {
    const url = `//localhost:5000${API.GET_USERS}`;
    return this.http.get<ApiResponse<User[]>>(url);
  }

  getUser(id: number): Observable<ApiResponse<User>> {
    const url = `//localhost:5000${API.GET_USER}/${id}`;
    return this.http.get<ApiResponse<User>>(url);
  }
}
