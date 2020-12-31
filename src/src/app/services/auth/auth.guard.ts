import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from './session.service';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(
        private readonly session: SessionService,
        private readonly router: Router
    ) {}

    canActivate(): Observable<boolean> {
        return this.session.getSessionValueAsObservable()
        .pipe(
            map((session) => {
                return session.user?.email.length > 0;
            }),
            tap((sessionActive) => {
                if (!sessionActive) {
                    this.router.navigate(['/login']);
                }
            }),
            take(1),
        );
    }
}