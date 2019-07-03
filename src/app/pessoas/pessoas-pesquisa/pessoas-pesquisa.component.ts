import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(
    private pessoaService: PessoaService
  ){}

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.pessoaService.pesquisar(this.filtro)
      .then((response) => {
        this.pessoas = response.pessoas;
      });
  }

}
