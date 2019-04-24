import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  vendasUrl = 'http://localhost:8080/vendas';

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(this.vendasUrl);
  }

  adicionar(venda : any) {
    return this.http.post(this.vendasUrl, venda);
  }

  deletar(id : any) {
    return this.http.delete(this.vendasUrl + '/' + id);
  }

  buscar(id : any) {
    return this.http.get<any>(this.vendasUrl + '/' + id);
  }

  alterar(venda : any) {
    return this.http.put<any>(this.vendasUrl + '/' + venda.id, venda);
  }
}
