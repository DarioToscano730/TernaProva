import { Component } from '@angular/core';
import { TernaserviceService } from './ternaservice.service';


@Component({
  selector: 'app-pagina-terna',
  templateUrl: './pagina-terna.component.html',
  styleUrl: './pagina-terna.component.css'
})
export class PaginaTernaComponent {
  dataFromServizioTerna: any;
  firebase: any;
  nome: any;
  azienda: any;
  motivo: any;

  constructor(private ternaservice : TernaserviceService){}

  ngOnInit(): void{
    this.ternaservice.getDataTerna().subscribe(data =>{
      this.dataFromServizioTerna = data;
    })
  }


}
