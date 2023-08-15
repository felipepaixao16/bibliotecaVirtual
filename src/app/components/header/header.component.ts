import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  erro: boolean = false;
  usuarioClicou: boolean = false;

  constructor(
    private router: Router, public authService: AuthService
  ) { }

  openLidos(): void {
    this.router.navigate(['/lidos']);
  }

  openSalvos(): void {
    this.router.navigate(['/salvos']);
  } 

  verif(): void {
    this.usuarioClicou = true;
    if(this.authService.validador === true) {
      console.log(this.authService.validador);
    } else {
      this.erro = true;
      setTimeout(() => {this.erro = false;}, 2000);
    };
  }

  logout(): void {
    this.authService.logout();
  }

  closeAlertError(): void {
    this.erro = false;
  }
}
