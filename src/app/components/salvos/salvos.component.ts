import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-salvos',
  templateUrl: './salvos.component.html',
  styleUrls: ['./salvos.component.css']
})
export class SalvosComponent implements OnInit {
  livrosSalvos: any[] = [];

  constructor(
    private livroService: LivrosService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.exibirLivrosSalvos();
  }

  exibirLivrosSalvos(): void {
    const token = this.authService.getTokenCookie();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.livroService.getLivrosSalvos(headers).subscribe(
      data => {
        this.livrosSalvos = data;
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
