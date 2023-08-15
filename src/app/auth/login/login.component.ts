import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  email: any;
	password: any;

  cadastrado: boolean = false;
  erro: boolean = false;

  constructor(
    private authService: AuthService,
     private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  loginProcess() {
    if(this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(result => {
        console.log(result);
        this.authService.validador = true;
        console.log(this.authService.validador);
        this.router.navigate(['/home']);
        },
      error => {
        console.log(error);
        this.erro = true;
        setTimeout(() => {this.erro = false; this.clearForm()}, 3000);
      });
    }}
 
    closeAlertError(): void {
      this.erro = false;
    }
  
    clearForm(): void {
      this.email = '';
      this.password = '';
    }
}
