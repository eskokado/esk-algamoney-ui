import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('angular:@ngul@r0'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `client=angular&username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida');
          }
        }
        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('angular:@ngul@r0'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
        console.log('Novo access token criado!');
        return Promise.resolve(null);
      })
      .catch(response => {
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    return !token || jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  private armazenarToken(token: string) {
    const jwtHelper = new JwtHelperService();
    this.jwtPayload = jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  refreshToken(): Observable<string> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const params = new HttpParams()
      .set('grant_type', 'refresh_token');

    return this.http.post<any>(this.oauthTokenUrl, null, { headers, params, withCredentials: true })
      .pipe(
        map(token => {
          this.armazenarToken(token.access_token);
          return token.access_token;
        })
      );
  }

}
