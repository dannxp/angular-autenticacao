import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosUsuario } from '../models/dadosUsuario.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

dadosUsuario: DadosUsuario = new DadosUsuario();

  constructor() { }

  autenticado(): boolean {
    if (!localStorage['token']) {
      return false;
    }
    try {
      const dadosUsuario = JSON.parse(atob(localStorage['token'].split('.')[1]));
      if (!dadosUsuario) {
        return false;
      }
      this.dadosUsuario = dadosUsuario;
      return parseInt(dadosUsuario.id) > 0;
    } catch (error) {
      return false;
    }
  }

  obterIdUsuario() {
    return this.dadosUsuario.id;
  }

  headers(){
    let httpHeaders = new HttpHeaders();
    if(localStorage['token']){
      httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + localStorage['token'] );
    }

    return {headers: httpHeaders};
    
  }
}

