import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' );

    return this.http.get(`${this.pessoasUrl}`, {headers})
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
