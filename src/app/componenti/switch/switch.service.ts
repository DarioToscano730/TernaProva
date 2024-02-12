import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { switche } from './switch';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {
  url = "http://localhost:3000/switch"

  constructor(private http : HttpClient) { }
  ngOnInit(){
    this.http.get(`${environment.apiUrl}/endpoint`).subscribe(data =>{
      console.log(data)
    });
}

  insertSwitch(body: any): Observable<switche> {
   return this.http.post<switche>(this.url, body);
  }

  getSwitch(): Observable<any> {
   return this.http.get<any>(this.url);
  }

  putSwitch(nome: string, newData: any): Observable<switche> {
    const url = `${this.url}/${nome}`; // Utilizza il parametro nome nell'URL per identificare il record da aggiornare
    return this.http.put<switche>(url, newData);
  }
  
  deleteSwitch(nome: string): Observable<any> {
    const url = `${this.url}/${nome}`;
    return this.http.delete(url);
  }
  

  /*getSwitch(body :any): Observable<switche[]> {
    return this.http.get<switche[]>(this.url, body);
  }*/

  
}
