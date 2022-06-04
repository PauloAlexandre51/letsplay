import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService,
                private rota: Router) { }

    public canActivate(): Observable<boolean> | boolean {
        if (this.authService.isAutenticado()) {
            return true;
        }
        this.rota.navigate(['/login']);
        return false;
    }
}