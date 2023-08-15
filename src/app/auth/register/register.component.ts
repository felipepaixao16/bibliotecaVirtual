import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users: any;
  nomeCompleto: any;
	email: any;
	password: any;
  cadastrado: boolean = false;
  erro: boolean = false;

  formulario!: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nomeCompleto: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  save(): void {
    const user = {
      nomeCompleto:this.nomeCompleto,
      email:this.email,
      password:this.password
    };
    console.log(user);
    this.authService.store(user)
    .subscribe(
      response => { console.log(response);
        this.clearForm();
        this.cadastrado = true;
        setTimeout(() => {this.cadastrado = false; this.router.navigate(['/login']);}, 3000);
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
    this.nomeCompleto = '';
    this.email = '';
    this.password = '';
  }
}

