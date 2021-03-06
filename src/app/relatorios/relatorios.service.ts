import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import * as moment from 'moment';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.lancamentosUrl =  `${environment.apiUrl}/lancamentos`;
   }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    let params = new HttpParams();
    params = params.set('dt_inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.set('dt_fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
      { params, responseType: 'blob' as 'blob' })
      .toPromise();
  }
}
