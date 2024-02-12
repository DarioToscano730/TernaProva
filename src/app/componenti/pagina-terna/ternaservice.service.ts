import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TernaserviceService {

  constructor() { }

  getDataTerna() : Observable<any>{
    const data = [

      {indirizzo : 'via Gramsci', PartitaIva : '1526248', Ceo : 'Manolo Cenci', Ambito : 'Networking'}
    ];
    return of(data);
  }

}
