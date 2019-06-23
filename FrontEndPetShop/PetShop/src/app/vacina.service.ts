import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VacinaService {

  vacinaUrl = 'http://localhost:8080/animal_vacina';

  constructor(private http: HttpClient) { }

  listar(filtro : any) {
    return this.http.post<any[]>(this.vacinaUrl+"/listar", filtro);
  }

  adicionar(vacina: any) {
    return this.http.post(this.vacinaUrl, vacina);
  }

  deletar(id: any) {
    return this.http.delete(this.vacinaUrl + '/' + id);
  }

  buscar(id: any) {
    return this.http.get<any>(this.vacinaUrl + '/' + id);
  }

  alterar(vacina: any) {
    return this.http.put<any>(this.vacinaUrl + '/' + vacina.id, vacina);
  }

}
