import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastrManager } from 'ng6-toastr-notifications';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa, Contato } from './../../core/models';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  constructor(
    private pessoaService: PessoaService,
    private toastr: ToastrManager,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova pessoa');

    const codigoPessoa = this.route.snapshot.params.codigo;

    this.carregarEstados();

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  carregarEstados() {
    this.pessoaService.listarEstados()
      .then(lista => {
        this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
      .then(lista => {
        this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo}));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then((pessoa) => {
        this.toastr.successToastr('Pessoa adicionada com sucesso!');
        //form.reset();
        //this.pessoa = new Pessoa();
        this.router.navigate(['/pessoas', pessoa.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then((pessoa) => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
        this.toastr.successToastr('Pessoa atualizada com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
