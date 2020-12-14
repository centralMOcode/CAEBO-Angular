import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  set(key: string, value:string) {
    window.sessionStorage.setItem(key, value);
  }

  get(key: string): string {
    return window.sessionStorage.getItem(key);
  }

  clear() {
    window.sessionStorage.clear();
  }
}
