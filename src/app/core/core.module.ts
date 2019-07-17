import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { JwtHelperService } from '@auth0/angular-jwt';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

import { DashboardService } from './../dashboard/dashboard.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { CategoriaService } from './../categorias/categoria.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { AuthService } from './../seguranca/auth.service';
import { RelatoriosService } from './../relatorios/relatorios.service';

import { NaoAutorizadoComponent } from './nao-autorizado.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastModule,

    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    AuthService,
    DashboardService,
    RelatoriosService,

    Title,

    JwtHelperService,
    ErrorHandlerService,
    ConfirmationService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
