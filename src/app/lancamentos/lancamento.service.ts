import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface LancamentoFiltro {
  descricao: string;
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

    headers = headers.set('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin') );

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    return this.http.get(`${this.lancamentoUrl}?resumo`, { headers, params })
      .toPromise();
  }
}
