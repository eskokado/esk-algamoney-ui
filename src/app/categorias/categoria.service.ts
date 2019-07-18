import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MoneyHttp } from './../seguranca/money-http';
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
    return this.http.get(`${this.catetoriasUrl}`)
      .toPromise();
  }
}
