import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { AutoresService } from 'src/app/services/autores.service';


@Component({
  selector: 'app-cad-autores',
  templateUrl: './cad-autores.component.html',
  styleUrls: ['./cad-autores.component.css'],
})

export class CadAutoresComponent implements OnInit {
  autores: any;
  nome!: string;
  dataDeNascimento!: string;
  nacionalidade!: string;
  cpf!: number;
  quantidadeLivro!: number;

  cadastrado: boolean = false;
  erro: boolean = false;

  formulario!: FormGroup;

  constructor(
    private autoresService: AutoresService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.exibirAutores();

    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      dataDeNascimento: ['', [Validators.required]],
      nacionalidade: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      quantidadeLivro: ['', [Validators.required]]
    });
  } 

  exibirAutores(): void {
    this.autoresService.list()
    .subscribe(
      data => {
        this.autores = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  save(): void {
    const autor = {
      nome:this.nome,
      dataDeNascimento:this.dataDeNascimento,
      nacionalidade:this.nacionalidade,
      cpf:this.cpf,
      quantidadeLivro:this.quantidadeLivro,
    };
    console.log(autor);
    const token = this.authService.getTokenCookie();
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`,});
    this.autoresService.create(autor, headers)
    .subscribe(
      response => {
        console.log(response);
        this.clearForm();
        this.cadastrado = true;
        setTimeout(() => {this.cadastrado = false;}, 3000);
        this.exibirAutores();
        window.location.reload();
      },
      error => {
        console.log(error);
        this.clearForm();
        this.erro = true;
        setTimeout(() => {this.erro = false;}, 2500);
      });
  }

  closeAlertSucess(): void {
    this.cadastrado = false;
  }

  closeAlertError(): void {
    this.erro = false;
  }

  clearForm(): void {
    this.nome = '';
    this.dataDeNascimento = '';
    this.nacionalidade = '';
    this.cpf = -0;
    this.quantidadeLivro = -0;
  }
}
