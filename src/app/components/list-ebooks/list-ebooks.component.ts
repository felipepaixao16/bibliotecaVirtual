import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-list-ebooks',
  templateUrl: './list-ebooks.component.html',
  styleUrls: ['./list-ebooks.component.css'],
})
export class ListEbooksComponent implements OnInit {
  livros: any;
  livro: any;

  constructor(
    private livroService: LivrosService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.exibirLivros();
  }

  exibirLivros(): void {
    this.livroService.list().subscribe(
      (data) => {
        this.livros = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  atualizarStatus(livro: any, novoStatus: string) {
    const statusObj = {
      status: novoStatus,
    };
    const token = this.authService.getTokenCookie();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.livroService.updateStatus(livro.id, statusObj, headers).subscribe(
      () => {
        livro.lido = novoStatus === 'LIDOS';
        livro.salvo = novoStatus === 'SALVOS';
        console.log(`Livro "${livro.titulo}" atualizado com status: ${novoStatus}`);
      },
      (error) => {
        console.error(`Erro ao atualizar status do livro "${livro.titulo}": ${error}`);
      }
    );
  }
}
