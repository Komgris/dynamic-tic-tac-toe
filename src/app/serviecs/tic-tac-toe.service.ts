import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  baseURL = 'http://localhost:3000/api/board/'
  constructor(
    private http: HttpClient
  ) { }

  async minimax(table:any){
    const response = await this.http.post(`${this.baseURL}minimax`,table,this.httpOptions).toPromise();
    return response;
  }
}
