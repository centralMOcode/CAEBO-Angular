import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private sessionStorage: SessionStorageService
  ) { }

  setUserSession(user: any) {
    this.sessionStorage.set("user", JSON.stringify(user));
  }

  logout() {
    this.sessionStorage.clear();
  }

  getSessionValueAsObservable() {
    return of({ user: JSON.parse(this.sessionStorage.get("user")) })
  }

  getSessionValue() {
    let store = {
      user: JSON.parse(this.sessionStorage.get("user"))
    }

    return store;
  }
}
