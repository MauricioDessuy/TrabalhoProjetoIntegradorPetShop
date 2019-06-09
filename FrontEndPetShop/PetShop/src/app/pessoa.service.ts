import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  listar(nome : any) {
    if (nome != null && nome != '') {
      return this.http.get<any[]>(this.pessoasUrl + '?nome=' + nome);
    } else {
      return this.http.get<any[]>(this.pessoasUrl);
    }
  }

  adicionar(pessoa : any) {
    return this.http.post(this.pessoasUrl, pessoa);
  }

  deletar(id : any) {
    return this.http.delete(this.pessoasUrl + '/' + id);
  }

  buscar(id : any) {
    return this.http.get<any>(this.pessoasUrl + '/' + id);
  }

  alterar(pessoa : any) {
    return this.http.put<any>(this.pessoasUrl + '/' + pessoa.id, pessoa);
  }

}