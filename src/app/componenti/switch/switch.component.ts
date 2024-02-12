import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switche } from './switch';
import { SwitchService } from './switch.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css'
})
export class SwitchComponent implements OnInit {
  formSwitch!: FormGroup;
  submitted : any
  loading = false;
  error: any;
  showForm = false;
  dataSource: switche[] = [];
  displayedColumns: string[] = ['nome', 'tipo', 'actions'];

  constructor(private formBuilder: FormBuilder, private switche : SwitchService){}

  ngOnInit(): void {
    this.formSwitch = this.formBuilder.group({
      nome : ['', [Validators.required, Validators.minLength(3)]],
      tipo : ['', Validators.required],
     
    });
    
    this.getSwitchData();
 
  }




  onSubmit() {
    this.submitted = true;

    if (this.formSwitch.invalid) {
      return;
    }

    this.loading = true;
    this.switche.insertSwitch({
      nome: this.formSwitch.value.nome,
      tipo: this.formSwitch.value.tipo
    }).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loading = false;
        // Se il salvataggio ha successo, nascondi il form
        this.showForm = false;
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    // Se stai aprendo il form, azzera anche submitted
    if (this.showForm) {
      this.submitted = false;
    }
  }

  getSwitchData() {
    this.switche.getSwitch().subscribe({
      next: (data: switche[]) => {
        console.log('Dati ricevuti dal backend:', data);
        // Inizializza isEditing su false per ogni riga dei dati ricevuti
        data.forEach(item => item.isEditing = false);
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Errore nel recupero dei dati:', error);
      }
    });
  }
  
  
  updateSwitch(nome: string, newData: any) {
    // Implementa la logica per l'aggiornamento del record nel database
    this.switche.putSwitch(nome, newData).subscribe({
      next: (data: any) => {
        console.log('Dati aggiornati:', data);
        this.getSwitchData(); // Aggiorna la tabella dopo l'aggiornamento
      },
      error: (error: any) => {
        console.error('Errore durante l\'aggiornamento:', error);
      }
    });
  }
  

  editRow(data: switche) {
    data.isEditing = true; // Imposta la modalità di modifica a true per la riga corrente
  }
  
 
  saveChanges(data: switche) {
    this.loading = true; // Attiva la visualizzazione della progress bar

    // Chiamata al metodo del servizio per aggiornare i dati nel backend
    this.switche.putSwitch(data.nome, { tipo: data.tipo }).subscribe({
      next: (response: any) => {
        console.log('Dati aggiornati con successo:', response);
        data.isEditing = false; // Disattiva la modalità di modifica una volta completato l'aggiornamento
        this.loading = false; // Disattiva la visualizzazione della progress bar
      },
      error: (error: any) => {
        console.error('Errore durante l\'aggiornamento dei dati:', error);
        this.loading = false; // Disattiva la visualizzazione della progress bar in caso di errore
      }
    });
  }

  deleteRow(data: switche) {
    const confirmation = confirm('Sei sicuro di voler eliminare questo record?');
    if (confirmation) {
      this.switche.deleteSwitch(data.nome).subscribe({
        next: (response) => {
          console.log('Record eliminato:', response);
          this.getSwitchData(); // Aggiorna la tabella dopo l'eliminazione
        },
        error: (error) => {
          console.error('Errore durante l\'eliminazione del record:', error);
        }
      });
    }
  }

}


