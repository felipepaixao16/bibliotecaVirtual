import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  list(): Observable<any> {
    return this.http.get(`${baseUrl}/autores`);
  }

  create(autor: any, headers: HttpHeaders): Observable<any> {
    return this.http.post(`${baseUrl}/autores`, autor, { headers });
  }

}
