import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  url = `${environment.apiUrl}/ticket`;


  constructor(private http : HttpClient) { }

  ngOnInit(){
    this.http.get(`${environment.apiUrl}/endpoint`).subscribe(data =>{
      console.log(data)
    });
}

  insertTicket( body : {}): Observable<any>{
    return this.http.post(this.url, body)
    
  }
}
