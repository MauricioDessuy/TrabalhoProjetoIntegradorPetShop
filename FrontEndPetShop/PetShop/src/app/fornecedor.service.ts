import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class FornecedorService {

  fornecedoresUrl = 'http://localhost:8080/fornecedores';

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(this.fornecedoresUrl);
  }

  adicionar(fornecedor : any) {
    return this.http.post(this.fornecedoresUrl, fornecedor);
  }

  deletar(id : any) {
    return this.http.delete(this.fornecedoresUrl + '/' + id);
  }

  buscar(id : any) {
    return this.http.get<any>(this.fornecedoresUrl + '/' + id);
  }

  alterar(fornecedor : any) {
    return this.http.put<any>(this.fornecedoresUrl + '/' + fornecedor.id, fornecedor);
  }

}