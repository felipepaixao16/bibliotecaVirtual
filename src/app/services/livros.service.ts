import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(`${baseUrl}/livros`);
  }

  findByIdConta(idConta:any): Observable<any> {
    return this.http.get(`${baseUrl}/livros/${idConta}`);
  }
  
  create(livro: any, headers: HttpHeaders): Observable<any> {
    return this.http.post(`${baseUrl}/livros`, livro, { headers });
  }

  // List-ebooks métodos
  updateStatus(id: string, status: any, headers: HttpHeaders): Observable<any> {
    return this.http.patch(`${baseUrl}/livros/${id}/status`, status, { headers });
  }

  getLivrosLidos(headers: HttpHeaders): Observable<any> {
    return this.http.get(`${baseUrl}/livros/lidos`, { headers });
  }

  getLivrosSalvos(headers: HttpHeaders): Observable<any> {
    return this.http.get(`${baseUrl}/livros/salvos`, { headers });
  }

  
}
