import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProdutoService {

  produtosUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  listar(nome : any, tipo : any) {
    if (nome != null && nome != '') {
      return this.http.get<any[]>(this.produtosUrl + "?nome=" + nome + "&tipo=" + tipo);
    } else {
      return this.http.get<any[]>(this.produtosUrl);
    }
  }

  adicionar(produto : any) {
    return this.http.post(this.produtosUrl, produto);
  }

  deletar(id : any) {
    return this.http.delete(this.produtosUrl + '/' + id)
  }

  buscar(id : any) {
    return this.http.get<any>(this.produtosUrl + '/' + id);
  }

  alterar(produto : any) {
    return this.http.put<any>(this.produtosUrl + '/' + produto.id, produto);
  }
  
  downloadPdf() {
    return this.http.get(this.produtosUrl + "/rel", { responseType:'blob' }).toPromise();
  }

}