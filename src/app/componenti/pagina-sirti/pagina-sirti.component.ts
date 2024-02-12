import { Component } from '@angular/core';
import { SirtiserviceService } from './sirtiservice.service';

@Component({
  selector: 'app-pagina-sirti',
  templateUrl: './pagina-sirti.component.html',
  styleUrl: './pagina-sirti.component.css'
})
export class PaginaSirtiComponent {

  dataFromServizioSirti: any;

  nome: any;
    azienda: any;
    motivo: any;
  
    constructor(private sirtiservice : SirtiserviceService){}
  
    ngOnInit(): void{
      this.sirtiservice.getDataSirti().subscribe(data =>{
        this.dataFromServizioSirti = data;
      })
    }
}
