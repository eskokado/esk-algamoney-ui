import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private authService: AuthService,
    private toastr: ToastrManager,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  login(usuario: string, senha: string) {
    this.authService.login(usuario, senha)
      .then(() => {
        this.toastr.successToastr('Logado com sucesso! Aguarde...');
        this.router.navigate(['']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
