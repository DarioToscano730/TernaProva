import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService implements OnInit {
  //url = "https://ternaprova-default-rtdb.europe-west1.firebasedatabase.app/utente.json"
  url = "http://localhost:3000/utente"

  constructor(private http : HttpClient) { }
  ngOnInit(){
      this.http.get('${environments.apiUrl}/endpoint').subscribe(data =>{
        console.log(data)
      });
  }

  insertUtente( body : {}): Observable<any>{
    return this.http.post(this.url, body)
    
  }
}
