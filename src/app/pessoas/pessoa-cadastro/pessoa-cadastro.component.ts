import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { PesssoaDTO } from './../../core/models';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new PesssoaDTO();

  constructor(
    private pessoaService: PessoaService,
    private toastr: ToastrManager,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.codigo);
    console.log(this.pessoa);
  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.toastr.successToastr('Pessoa adicionada com sucesso!');
        form.reset();
        this.pessoa = new PesssoaDTO();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
