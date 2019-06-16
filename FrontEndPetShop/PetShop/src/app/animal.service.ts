import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AnimalService {

  animalsUrl = 'http://localhost:8080/animais';

  constructor(private http: HttpClient) { }

  listar(animalFiltro : any) {
    return this.http.post<any[]>(this.animalsUrl + "/pessoa/" + animalFiltro.pessoa.id, animalFiltro);
  }
  listarTodos() {
    return this.http.get<any[]>(this.animalsUrl);
  }

  adicionar(animal : any) {
    return this.http.post(this.animalsUrl, animal);
  }

  deletar(id : any) {
    return this.http.delete(this.animalsUrl + '/' + id);
  }

  buscar(id : any) {
    return this.http.get<any>(this.animalsUrl + '/' + id);
  }

  alterar(animal : any) {
    return this.http.put<any>(this.animalsUrl + '/' + animal.id, animal);
  }
  buscar(id : any) {
    return this.http.get<any>(this.animalsUrl + '/' + id);
  }

}