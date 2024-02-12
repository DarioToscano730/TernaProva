import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as bcrypt from 'bcryptjs';
import { delay, finalize } from 'rxjs';
import { RegisterService } from './register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required] )
  registerForm!: FormGroup;
  loading = false;
  submitted : any
  error: boolean = false;

  constructor(private formBuilder: FormBuilder, private register : RegisterService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/) // Aggiunge il controllo per i caratteri speciali
    ]);

    this.registerForm = this.formBuilder.group({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }
  
onSubmit() {
  if (this.registerForm.valid){
  this.error=false;
  this.submitted = true;
  const hashedPassword = bcrypt.hashSync(this.registerForm.value.password, 10); // Il secondo parametro è il saltRounds
  this.loading = true; // Attiva la progress bar
  this.register.insertUtente( {
          email: this.registerForm.value.email,
          password: hashedPassword,
          
        }).pipe(
          delay(5000),
          finalize(() =>{
            this.loading = false;
          })
        ).subscribe({next: (data) =>{
          
          console.log(data);
          this.loading = false; // Disattiva la progress bar dopo che la richiesta è completata
        },
        error: (error) => {
          this.error = true;
          const errorMessage = error.message || 'Si è verificato un errore generico'; // Se la proprietà 'message' non è presente, usa un messaggio generico
          this._snackBar.open(errorMessage, 'Chiudi');
        }
    })
  console.log(this.registerForm.value);
  
      }
}
}
