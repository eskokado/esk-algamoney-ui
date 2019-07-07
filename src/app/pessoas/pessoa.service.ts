import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pessoa } from '../core/models';
import { AuthService } from './../seguranca/auth.service';

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
    private http: HttpClient,
    private auth: AuthService
  ) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
//    let headers = new HttpHeaders();
    let params = new HttpParams();
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin') );
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
//    return this.http.get(`${this.pessoasUrl}`, {headers, params})
    return this.http.get(`${this.pessoasUrl}`, {params})
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
//    let headers = new HttpHeaders();
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.set('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );

//    return this.http.get(`${this.pessoasUrl}`, {headers})
    return this.http.get(`${this.pessoasUrl}`)
      .toPromise<any>()
      .then((response) => {
 //       console.log(response.content);
        return response.content;
      });
  }

  excluir(codigo: number) {
//    let headers = new HttpHeaders();
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin') );
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );

//    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean) {
//    let headers = new HttpHeaders();
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );
//    headers = headers.append('Content-Type', 'application/json');

//    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
//    let headers = new HttpHeaders();
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );
//    headers = headers.append('Content-Type', 'application/json');

//    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers })
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
//    let headers = new HttpHeaders();
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );
//    headers = headers.append('Content-Type', 'application/json');

//    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers })
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
//    let headers = new HttpHeaders();
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );

//    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, { headers })
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise();
  }

}
