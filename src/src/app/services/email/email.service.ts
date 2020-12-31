import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, UserEmail } from 'src/app/models/caebo.constants';
import { API } from 'src/shared/api/api.constants';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http:HttpClient
  ) { }

  getUserEmails(id: number): Observable<ApiResponse<UserEmail[]>> {
    const url = `//localhost:5000${API.GET_USER_EMAILS}/${id}`;
    console.log(url)
    return this.http.get<ApiResponse<UserEmail[]>>(url);
  }

}
