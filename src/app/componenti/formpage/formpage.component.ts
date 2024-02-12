import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { TicketService } from './ticket.service';

@Component({
  selector: 'app-formpage',
  templateUrl: './formpage.component.html',
  styleUrls: ['./formpage.component.css'],
 // providers: [TicketService]
})
export class FormpageComponent implements OnInit {
  formform!: FormGroup;
  datiForm: any;
  submitted: any;
  loading = false;

  constructor(private formBuilder: FormBuilder, private ticket: TicketService) {}

  ngOnInit() {
    this.formform = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      azienda: ['', Validators.required],
      motivo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formform.valid) {
      this.submitted = true;
      this.datiForm = { ...this.formform.value };

      this.loading = true; // Attiva la progress bar

      this.ticket
        .insertTicket({
          nome: this.formform.value.nome,
          azienda: this.formform.value.azienda,
          motivo: this.formform.value.motivo
        })
        .pipe(
          tap(() => console.log('Dati del form:', this.formform.value)),
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          (data: any) => {
            console.log(data);
            // Gestisci il risultato se necessario
          },
          (error) => {
            console.error(error);
            // Gestisci l'errore in modo più dettagliato se necessario
          }
        );
    }
  }
}
