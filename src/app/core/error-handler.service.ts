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
        let errors;
        msg = 'Ocorreu um erro ao processar a sua solicitação';

        if (errorResponse.status === 403) {
          msg = 'Você não tem permissão para executar esta ação';
        }

        try {
          errors = errorResponse;

          msg = errors[0].mensagemUsuario;
        } catch (e) { }

//        console.error('Ocorreu um erro', errorResponse);
//      if (errorResponse.error.error_description) {
//        msg = errorResponse.error.error_description;
//      } else if (errorResponse.error[0].mensagemUsuario) {
//        msg = errorResponse.error[0].mensagemUsuario;
//      } else {
//        msg = 'Erro ao processar serviço remoto. Tente novamente.';
//      }
//      console.log('Ocorreu um erro.', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
//      console.log('Ocorreu um erro.', errorResponse)
    }

    this.toastr.errorToastr(msg);
  }
}
