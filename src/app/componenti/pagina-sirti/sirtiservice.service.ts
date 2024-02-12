import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SirtiserviceService {

  constructor() { }

  getDataSirti() : Observable<any>{
    const data = [
      {indirizzo : 'Viale della bella villa', PartitaIva : '165432', Ceo : 'Toscano Dario', Ambito : 'Digital Solution'}
    ];
    return of(data);
  }
}
