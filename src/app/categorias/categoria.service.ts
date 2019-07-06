import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  catetoriasUrl = 'http://localhost:8080/categorias';

  constructor(
    private http: HttpClient
  ) { }

  listarTodas(): Promise<any> {
    let headers = new HttpHeaders();
//    headers = headers.set('Authorization', 'Basic ' + btoa('admin@algamoney.com' + ':' + 'admin'));
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token') );
    return this.http.get(`${this.catetoriasUrl}`, { headers })
      .toPromise<any>()
      .then((response) => {
        console.log(response);
        return response;
      });
  }
}
