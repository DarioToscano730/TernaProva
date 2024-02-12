import { Component } from '@angular/core';
import { CiscoserviceService } from './ciscoservice.service';

@Component({
  selector: 'app-pagina-cisco',
  templateUrl: './pagina-cisco.component.html',
  styleUrl: './pagina-cisco.component.css'
})
export class PaginaCiscoComponent {
dataFromServizioCisco: any;

Indirizzo: any;
Ceo : any;
PartitaIva : any;
Ambito : any;


  constructor(private ciscoservice : CiscoserviceService){}

  ngOnInit(): void{
    this.ciscoservice.getDataCisco().subscribe(data =>{
      this.dataFromServizioCisco = data;
    })
    this.dataFromServizioCisco.insertAzienda('https://ternaprova-default-rtdb.europe-west1.firebasedatabase.app/Azienda.json', {indirizzo : 'via Gabriele', PartitaIva : '165465154', Ceo : 'Paul Pascu', Ambito : 'Networking'})
    
  }
}
