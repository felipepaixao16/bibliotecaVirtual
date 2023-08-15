import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  emailExists(email: any) {
    throw new Error('Method not implemented.');
  }
  passwordIncorrect(email: any, password: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService) 
    {}

  //Validador global
  public validador: boolean = false;

  // Register métodos
  store(user: any): Observable<any> {
    return this.http.post(`${baseUrl}/api/v1/users`,user);
  }

  findAll(): Observable<any> {
    return this.http.get(`${baseUrl}/api/v1/users`);
  }

  // Auth métodos
  login(payload: any): Observable<any> {
    return this.http.post(`${baseUrl}/api/auth/login`, payload).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.cookieService.set('jwtToken', response.token);
        }
      })
    );
  }

  getTokenCookie(): string {
    return this.cookieService.get('jwtToken');
  }  

  logout(): void {
    this.cookieService.delete('jwtToken');
  }
}
