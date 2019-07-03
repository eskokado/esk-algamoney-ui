import { Component, OnInit, Input } from '@angular/core';
import { LancamentoFiltro } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent  {

  @Input() lancamentos = [];
  @Input() totalRegistros;
  @Input() filtro = new LancamentoFiltro();


}
