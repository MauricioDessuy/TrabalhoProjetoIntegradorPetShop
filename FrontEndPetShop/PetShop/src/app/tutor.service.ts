import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TutorService {

  tutoresUrl = 'http://localhost:8080/tutores';

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(`${this.tutoresUrl}`);
  }
}
