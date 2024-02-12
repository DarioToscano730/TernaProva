import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiscoserviceService {

  constructor( private http : HttpClient) { }
  getDataCisco() : Observable<any>{
    const data = [

      {indirizzo : 'via Gabriele', PartitaIva : '165465154', Ceo : 'Paul Pascu', Ambito : 'Networking'}
    ];
    return of(data);
  }

  insertAziende(url : string, body : {}): Observable<any>{
    return this.http.post(url, body)
  }
}
