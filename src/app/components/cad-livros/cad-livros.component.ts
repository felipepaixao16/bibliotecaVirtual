import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AutoresService } from 'src/app/services/autores.service';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-cad-livros',
  templateUrl: './cad-livros.component.html',
  styleUrls: ['./cad-livros.component.css'],
})
export class CadLivrosComponent implements OnInit {
  autores: any;
  autor: any;

  titulo!: string;
  img_url!: string;
  genero!: string;
  idioma!: string;
  anoDePublicacao!: number;
  sinopse!: string;

  cadastrado: boolean = false;
  erro: boolean = false;

  formulario!: FormGroup;

  constructor(
    private livroService: LivrosService,
    private autoresService: AutoresService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exibirAutores();

    this.formulario = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      img_url: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      idioma: ['', [Validators.required]],
      anoDePublicacao: ['', [Validators.required]],
      sinopse: ['', [Validators.required, Validators.maxLength(188)]],
      autor: ['', [Validators.required]]
    });
  }

  exibirAutores(): void {
    this.autoresService.list().subscribe(
      data => {
        this.autores = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  save(): void {
    if (this.autor) {
      const livro = {
        titulo: this.titulo,
        img_url: this.img_url,
        genero: this.genero,
        idioma: this.idioma,
        anoDePublicacao: this.anoDePublicacao,
        sinopse: this.sinopse,
        autores: this.autor.nome
      };
      const token = this.authService.getTokenCookie();
      const headers = new HttpHeaders({Authorization: `Bearer ${token}`,});
      this.livroService.create(livro, headers)
      .subscribe(
        response => {
          console.log(response);
          this.clearForm();
          this.cadastrado = true;
          setTimeout(() => {this.cadastrado = false;}, 2000);
          window.location.reload();
        },
        error => {
          console.log(error);
          this.erro = true;
          setTimeout(() => {this.erro = false;}, 2500);
          this.clearForm();
        }
      );
    }
  }

   //Contador de caracteres
   private _text: string = '';

   public get text(): string {
    return this._text || '';
  }

   public set text(value: string) {
    this._text = value;
    this.debug(value);
   }

   public debug(value: string) {
    console.log(value);
   }

  //Alertas
  closeAlert(): void {
    this.cadastrado = false;
  }

  closeAlertError(): void {
    this.erro = false;
  }

  //Limpar formulário
  clearForm(): void {
    this.titulo = '';
    this.img_url = '';
    this.genero = '';
    this.idioma = '';
    this.anoDePublicacao = 0;
    this.sinopse = '';
    this.autor = null;
  }
}
