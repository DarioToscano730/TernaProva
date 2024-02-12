/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required] )
  loginForm!: FormGroup;
  loginService: any;
  loginError: string | null = null;
  router: any;
  

  constructor(private formBuilder: FormBuilder, loginService : LoginService ){}

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

    this.loginForm = this.formBuilder.group({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.loginService.login(email, password).subscribe(
        (response: any) => {
          // Login avvenuto con successo, memorizza il token JWT nel local storage
          localStorage.setItem('token', response.token);
          // Reindirizza alla dashboard o a un'altra pagina
          this.router.navigate(['/homepage']);
        },
        (error: any) => {
          // Errore durante il login, gestisci l'errore
          this.loginError = error.message;
        }
      );
    }
  }
  }*/

  import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa il Router da '@angular/router'
import * as bcrypt from 'bcryptjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const hashedPassword = bcrypt.hashSync(password, 10);
      this.loginService.login(email).subscribe(
        (response: any) => {
          if (bcrypt.compareSync(password, response.password) == false){
            this.loginError = 'Credenziali errate'
          }else {
            this.router.navigate(['/homepage']);
          }

          //localStorage.setItem('token', response.token);
          // Reindirizza alla homepage dopo il login
          
        },
        (error: any) => {
          this.loginError = error.message;

        }
      );
    }
  }
}


