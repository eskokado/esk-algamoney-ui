import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { Lancamento } from './../core/models';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient
  ) {}

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin') );

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe',
                          moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte',
                          moment(filtro.dataVencimentoFim).format('YYYY-MM-DD') );
    }

    return this.http.get(`${this.lancamentoUrl}?resumo`, { headers, params })
      .toPromise<any>()
      .then(response => {
        const lancamentos = response.content;

        const resultado = {
          lancamentos,
          total: response.totalElements
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin') );

    return this.http.delete(`${this.lancamentoUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);

  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));
    headers = headers.append('Content-Type', 'application/json');

//    console.log(lancamento);

    return this.http.post<Lancamento>(this.lancamentoUrl, lancamento, { headers })
      .toPromise();
  }
}
