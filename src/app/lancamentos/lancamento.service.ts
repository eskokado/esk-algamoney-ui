import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { AuthService } from './../seguranca/auth.service';
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
    private http: HttpClient,
    private auth: AuthService
  ) {}

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();
//    let headers = new HttpHeaders();
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin') );
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );

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

//    return this.http.get(`${this.lancamentoUrl}?resumo`, { headers, params })
    return this.http.get(`${this.lancamentoUrl}?resumo`, { params })
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

  excluir(codigo: number): Promise<any> {
//    let headers = new HttpHeaders();
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin') );
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );

//    return this.http.delete(`${this.lancamentoUrl}/${codigo}`, { headers })
    return this.http.delete(`${this.lancamentoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);

  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
//    let headers = new HttpHeaders();
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );
//    headers = headers.append('Content-Type', 'application/json');

//    console.log(lancamento);

//    return this.http.post<Lancamento>(this.lancamentoUrl, lancamento, { headers })
    return this.http.post<Lancamento>(this.lancamentoUrl, lancamento)
      .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
//    let headers = new HttpHeaders();
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );
//    headers = headers.append('Content-Type', 'application/json');

//    return this.http.put<Lancamento>(`${this.lancamentoUrl}/${lancamento.codigo}`, lancamento, { headers })
    return this.http.put<Lancamento>(`${this.lancamentoUrl}/${lancamento.codigo}`, lancamento)
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
//    let headers = new HttpHeaders();
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );

//    return this.http.get<Lancamento>(`${this.lancamentoUrl}/${codigo}`, { headers })
    return this.http.get<Lancamento>(`${this.lancamentoUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }

}
