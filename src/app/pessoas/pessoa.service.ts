import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface PessoaFiltro {
  nome: string;
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

    headers = headers.set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' );

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
    return this.http.get(`${this.pessoasUrl}`, {headers, params})
      .toPromise();
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' );

    return this.http.get(`${this.pessoasUrl}`, {headers})
      .toPromise()
      .then((response) => {
        return response.content;
      });
  }

}
