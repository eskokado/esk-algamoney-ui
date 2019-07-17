import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from './../shared/shared.module';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { RouterModule } from '@angular/router';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    InputMaskModule,
    PanelModule,
    DialogModule,
    DropdownModule,

    SharedModule,

    PessoasRoutingModule

  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoaCadastroContatoComponent,
  ],
  exports: [],
  providers: []
})
export class PessoasModule { }
