import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent} from 'primeng/components/common/lazyloadevent';

import { ToastrManager } from 'ng6-toastr-notifications';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  @ViewChild('tabela', {static: true}) grid;

  constructor(
    private lancamentoService: LancamentoService,
    private toastr: ToastrManager,
    private confirmation: ConfirmationService
  ){}

  ngOnInit() {
    //this.pesquisar(); // retirado ao utilizar o lazy do table do PRIMENG
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar( this.filtro )
      .then((response) => {
        this.totalRegistros = response.total;
        this.lancamentos = response.lancamentos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.grid.reset();
        this.toastr.successToastr('Lançamento excluido com sucesso!');
      });
  }

}
