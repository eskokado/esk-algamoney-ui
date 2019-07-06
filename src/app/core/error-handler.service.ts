import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastr: ToastrManager) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse &&
      errorResponse.status >= 400 &&
      errorResponse.status <= 499) {
      if (errorResponse.error.error_description) {
        msg = errorResponse.error.error_description;
//      } else if (errorResponse.error[0].mensagemUsuario) {
//        msg = errorResponse.error[0].mensagemUsuario;
      } else {
        msg = 'Erro ao processar serviço remoto. Tente novamente.';
      }
      console.log('Ocorreu um erro.', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro.', errorResponse)
    }

    this.toastr.errorToastr(msg);
  }
}
