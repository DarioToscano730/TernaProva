import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, finalize, tap } from 'rxjs/operators'; // Importa correttamente gli operatori RxJS
import { DispositiviService } from './dispositivi.service';
import { Router } from './router';

@Component({
  selector: 'app-dispositivi',
  templateUrl: './dispositivi.component.html',
  styleUrls: ['./dispositivi.component.css'],
  providers: [DispositiviService]
})
export class DispositiviComponent implements OnInit {

  formdispositivi!: FormGroup;
  submitted: any;
  loading = false;
  error: any;
  showForm = false;
  dataSource: Router[] = [];
  displayedColumns: string[] = ['nome', 'tipo', 'actions'];
  selection = new SelectionModel<Router>(true, []);

  constructor(private formBuilder: FormBuilder, private dispositivi: DispositiviService) { }

  ngOnInit() {
    this.formdispositivi = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
    });
    this.getRouterData(); // Chiamata alla funzione per recuperare i dati iniziali
  }

  onSubmit() {
    if (this.formdispositivi.valid) {
      this.submitted = true;
      this.loading = true; // Attiva la progress bar
      this.dispositivi.insertDispositivi({
        nome: this.formdispositivi.value.nome,
        tipo: this.formdispositivi.value.tipo
      })
        .pipe(
          tap(() => console.log('Dati del form:', this.formdispositivi.value)),
          delay(5000), // Simula un ritardo di 5 secondi
          finalize(() => {
            this.loading = false;
          })
        ).subscribe({
          next: (data: any) => {
            console.log(data);
            this.loading = false;
          },
          error: (error: any) => {
            console.error(error);
            this.loading = false;
          }
        });
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    // Se stai aprendo il form, azzera anche submitted
    if (this.showForm) {
      this.submitted = false;
    }
  }

  getRouterData() {
    this.dispositivi.getRouter().subscribe({
      next: (data: Router[]) => { // Correggi il tipo di data in router[]
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;     //data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Router): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nome + 1}`;
  }


  deleteRow(data: Router) {
    const confirmation = confirm('Sei sicuro di voler eliminare questo record?');
    if (confirmation) {
      this.dispositivi.deleteRouter(data.nome).subscribe({
        next: (response) => {
          console.log('Record eliminato:', response);
          this.getRouterData(); // Aggiorna la tabella dopo l'eliminazione
        },
        error: (error) => {
          console.error('Errore durante l\'eliminazione del record:', error);
        }
      });
    }
  }
  
}
