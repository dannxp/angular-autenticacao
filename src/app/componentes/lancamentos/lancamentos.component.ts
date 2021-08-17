import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosUsuario } from 'src/app/models/dadosUsuario.model';
import { Lancamento } from 'src/app/models/lancamento.model';
import { LancamentoService } from 'src/app/servicos/lancamento.service';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {

  lancamentos: Lancamento[] = [];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.lancamentoService.listarTodos().subscribe(
    dados => this.lancamentos = dados.data.content, 
    () => alert('Erro obtendo lançamentos.'));
   
  }

  urlLocalizacao(localizacao: string){
    return "https://www.google.com/maps/search/?api=1&query=" + localizacao;
  }
}
