import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LidosComponent } from './components/lidos/lidos.component';
import { SalvosComponent } from './components/salvos/salvos.component';
import { CadAutoresComponent } from './components/cad-autores/cad-autores.component';
import { CadLivrosComponent } from './components/cad-livros/cad-livros.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth-guards';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "lidos", component: LidosComponent, canActivate: [AuthGuard]},
  {path: "salvos", component: SalvosComponent, canActivate: [AuthGuard]},
  {path: "cad-autores", component: CadAutoresComponent},
  {path: "cad-livros", component: CadLivrosComponent},
  {path: "**", component: HomeComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
