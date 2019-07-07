import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthInterceptService } from './seguranca/auth-intercept.service';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { SegurancaModule } from './seguranca/seguranca.module';

registerLocaleData(localePt);

export function tokenGetter() {
  console.log('Executado a função tokenGetter');
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    HttpClientModule,

    CoreModule,

    LancamentosModule,
    PessoasModule,
    SegurancaModule,

    AppRoutingModule,
  ],
  providers: [
    {  provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptService, // <- Nome da classe que você criou.
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
