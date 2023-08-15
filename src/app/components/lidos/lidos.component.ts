import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LivrosService } from 'src/app/services/livros.service';


@Component({
  selector: 'app-lidos',
  templateUrl: './lidos.component.html',
  styleUrls: ['./lidos.component.css']
})
export class LidosComponent implements OnInit {  
  livrosLidos: any[] = [];

  constructor(
    private livroService: LivrosService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.exibirLivrosLidos();
  }

  exibirLivrosLidos(): void {
    const token = this.authService.getTokenCookie();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.livroService.getLivrosLidos(headers).subscribe(
      data => {
        this.livrosLidos = data;
        console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("Request completed.");
      }
    );
  }
  
}
