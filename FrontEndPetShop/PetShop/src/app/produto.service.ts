import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProdutoService {

  produtosUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(this.produtosUrl);
  }

  adicionar(produto : any) {
    return this.http.post(this.produtosUrl, produto);
  }

  deletar(id : any) {
    return this.http.delete(this.produtosUrl + '/' + id)
  }

}