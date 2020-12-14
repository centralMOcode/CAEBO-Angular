import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { ApiResponse, AuthRequest, AuthResponse } from 'src/app/models/caebo.constants';
import { API } from 'src/shared/api/api.constants';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private session: SessionService
    ) { }

  login(credentials: AuthRequest): Observable<ApiResponse<AuthResponse>> {
    const url = `//localhost:5000${API.LOGIN}`;
    return this.http.post<ApiResponse<AuthResponse>>(url, credentials)
    .pipe(
      tap(user => {
        const userData = this.getDecodedAccessToken(user.message?.token)
        if (userData) {
          this.session.setUserSession(userData);
        }
      })
    );
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch(error) {
      return null;
    }
  }
}
