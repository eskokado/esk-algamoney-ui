import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './../seguranca/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  catetoriasUrl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.catetoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Promise<any> {
//    let headers = new HttpHeaders();
//    headers = headers.set('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));
//    if (this.auth.isAccessTokenInvalido()) {
//      this.auth.obterNovoAccessToken();
//    }
//    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );
//    return this.http.get(`${this.catetoriasUrl}`, { headers })
    return this.http.get(`${this.catetoriasUrl}`)
      .toPromise<any>()
      .then((response) => {
//        console.log(response);
        return response;
      });
  }
}
