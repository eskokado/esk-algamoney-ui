import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin') );

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
    return this.http.get(`${this.pessoasUrl}`, {headers, params})
      .toPromise<any>()
      .then((response) => {
        const pessoas = response.content;

        const resultado = {
          pessoas,
          total: response.totalElements
        };
        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' );

    return this.http.get(`${this.pessoasUrl}`, {headers})
      .toPromise<any>()
      .then((response) => {
        return response.content;
      });
  }

}
