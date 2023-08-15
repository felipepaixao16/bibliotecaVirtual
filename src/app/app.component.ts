import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const jwtToken = this.cookieService.get('jwtToken');
    if (jwtToken) {
      this.authService.validador = true;
    }
  }
}
