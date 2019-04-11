import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AnimalService {

  animalsUrl = 'http://localhost:8080/animais';

  constructor(private http: HttpClient) { }

  listar(animalFiltro : any) {
    return this.http.post<any[]>(this.animalsUrl + "/pessoa/" + animalFiltro.idPessoa, animalFiltro);
  }

  adicionar(animal : any) {
    return this.http.post(this.animalsUrl, animal);
  }

  deletar(id : any) {
    return this.http.delete(this.animalsUrl + '/' + id)
  }

}