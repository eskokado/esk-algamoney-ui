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
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));

    return this.http.get(`${this.pessoasUrl}`, {headers})
      .toPromise<any>()
      .then((response) => {
        console.log(response.content);
        return response.content;
      });
  }

  excluir(codigo: number) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin') );

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

}
