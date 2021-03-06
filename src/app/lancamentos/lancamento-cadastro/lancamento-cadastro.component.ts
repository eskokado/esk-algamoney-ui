import { Component, OnInit } from '@angular/core';
//import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  // lancamento = new Lancamento();
  formulario: FormGroup;
  uploadEmAndamento = false;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
//    console.log(this.route.snapshot.params.codigo);
    this.configurarFormulario();
    this.title.setTitle('Novo lançamento');

    const codigoLancamento = this.route.snapshot.params.codigo;

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  antesUploadAnexo(event) {
    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {
    const anexo = event.originalEvent.body;

    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.url
    });

    this.uploadEmAndamento = false;
  }

  erroUpload(event) {
    this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar anexo!' });
    this.uploadEmAndamento = false;
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  get nomeAnexo() {
    const nome = this.formulario.get('anexo').value;
    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length );
    }
    return '';
  }

  get urlAnexo() {
    const url = this.formulario.get('urlAnexo').value;
    if (url) {
      return `https://${url}`;
    }
    return '';
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [ null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5)] ],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    // const dtvencto = input.root.get('descricao').value;
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return ( input: FormControl ) => {
      return ( !input.value || input.value.length >= valor ) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  get editando() {
    //return Boolean(this.lancamento.codigo);
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        //this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


//  salvar(form: FormControl) {
  salvar() {
  if (this.editando) {
//      this.atualizarLancamento(form);
      this.atualizarLancamento();
} else {
//      this.adicionarLancamento(form);
      this.adicionarLancamento();
}
  }


//  adicionarLancamento(form: FormControl) {
  adicionarLancamento() {
//  this.lancamentoService.adicionar(this.lancamento)
    this.lancamentoService.adicionar(this.formulario.value)
      .then((lancamento) => {
        this.messageService.add({ severity: 'success', detail: 'Erro ao tentar enviar anexo!' });
        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamento.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

//  atualizarLancamento(form: FormControl) {
  atualizarLancamento() {
//  this.lancamentoService.atualizar(this.lancamento)
    this.lancamentoService.atualizar(this.formulario.value)
      .then((lancamento) => {
        //this.lancamento = lancamento;
        this.messageService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso!' });
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then((categorias) => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then((pessoas) => {
        this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

//  novo(form: FormControl) {
  novo() {
//  form.reset();
    this.formulario.reset();
    setTimeout(() => {
//      this.lancamento = new Lancamento();
//      this.lancamento = new Lancamento();
}, 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
//    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
}
}
