import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Router } from 'express';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Router } from './router';

@Injectable({
  providedIn: 'root'
})
export class DispositiviService {
  url = "http://localhost:3000/router"
  isEditing: boolean | undefined;
  
 

  constructor(private http : HttpClient) { }
  
  ngOnInit(){
    this.http.get(`${environment.apiUrl}/endpoint`).subscribe(data =>{
      console.log(data)
    });
}


insertDispositivi(body: any): Observable<Router> {
  return this.http.post<Router>(this.url, body);
}



getRouter(): Observable<Router[]> { // Utilizza l'interfaccia router come tipo di ritorno
  return this.http.get<Router[]>(this.url);
}


 putRouter(nome: string, newData: any): Observable<DispositiviService> {
  const url = `${this.url}/${nome}`; // Utilizza il parametro nome nell'URL per identificare il record da aggiornare
  return this.http.put<DispositiviService>(url, newData);
}

deleteRouter(nome: string): Observable<any> {
  const url = `${this.url}/${nome}`;
  return this.http.delete(url);
}


}