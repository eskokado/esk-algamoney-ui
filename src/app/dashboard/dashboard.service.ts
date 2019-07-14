import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { environment } from './../../environments/environment.prod';
import { ErrorHandlerService } from './../core/error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl: string;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

   lancamentosPorCategoria(): Promise<Array<any>> {
     return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise<any>()
      .catch(erro => this.errorHandler.handle(erro));
   }

   lancamentoPorDia(): Promise<Array<any>> {
     return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .toPromise<any>()
      .then((response) => {
        const dados = response;
        this.converterStringsParaDatas(dados);
        return dados;
      })
      .catch(erro => this.errorHandler.handle(erro));
   }

   private converterStringsParaDatas(dados: Array<any>) {
    for ( const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
   }
}
