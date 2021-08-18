import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import {environment as env} from 'src/environments/environment';
import { HttpService } from './http.service';
import { saveAs } from 'file-saver';
import { Lancamento } from '../models/lancamento.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
 
  constructor(private http: HttpClient, private httpService: HttpService) { }

  listarTodos(): Observable<any>{
  const id = this.httpService.obterIdUsuario(); 
  

 

  return this.http.get(env.apiBaseUrl + 'api/lancamentos/funcionario/' + id, this.httpService.headers());
  
  }

  downloadCSV(lancamentos: Lancamento[]) {
    const col = 'ID, Data, Hora, Tipo, Localização\n';
    const linhas: string [] = [];

    lancamentos.forEach(lancamento =>{
      const dataHora = lancamento.data.split(' ');
      const linha = `${lancamento.id}, ${dataHora[0]}, ${dataHora[1]}, ${lancamento.tipo}, ${lancamento.localizacao}`;
      linhas.push(linha);
    });
    const dados = col + linhas.join('\n');
    const blob = new Blob([dados], {type: 'text/csv'});
    saveAs(blob, 'lancamentos.csv');
  }

  downloadPDF(lancamentos: Lancamento[]) {
    const colunas = ['ID', 'Data', 'Hora', 'Tipo', 'Localização'];
    const linhas: string [] [] = [];
    lancamentos.forEach(lanc =>{
      const dataHora = lanc.data.split(' ');
      linhas.push([
        lanc.id.toString(),
        dataHora[0],
        dataHora[1],
        lanc.tipo,
        lanc.localizacao
      ]);
    });

    const doc = new jsPDF();
    const data = new Date();
    (doc as any).text(15, 10, 'Listagem de Lançamentos');
    (doc as any).setFontSize(8);
    (doc as any).text(170, 10, data.toLocaleString('pt-BR'));
    (doc as any).autoTable({
      head: [colunas],
      body: linhas,
      theme: 'grid'
    });

    
    doc.save('lancamentos' + data.toLocaleDateString('pt-BR') + '.pdf');
  }

  }

  

