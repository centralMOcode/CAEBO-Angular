import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, AuthRequest, AuthResponse } from 'src/app/models/caebo.constants';
import { API } from 'src/shared/api/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(credentials: AuthRequest): Observable<ApiResponse<AuthResponse>> {
    const url = `//localhost:5000${API.LOGIN}`;
    return this.http.post<ApiResponse<AuthResponse>>(url, credentials);
  }
}
