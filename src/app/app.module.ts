import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { DispositiviComponent } from './componenti/dispositivi/dispositivi.component';
import { FormpageComponent } from './componenti/formpage/formpage.component';
import { HomepageComponent } from './componenti/homepage/homepage.component';
import { LoginComponent } from './componenti/login/login.component';
import { PaginaCiscoComponent } from './componenti/pagina-cisco/pagina-cisco.component';
import { PaginaSirtiComponent } from './componenti/pagina-sirti/pagina-sirti.component';
import { PaginaTernaComponent } from './componenti/pagina-terna/pagina-terna.component';
import { RegisterComponent } from './componenti/register/register.component';
import { SwitchComponent } from './componenti/switch/switch.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FormpageComponent,
    PaginaTernaComponent,
    RegisterComponent,
    PaginaCiscoComponent,
    PaginaSirtiComponent,
    LoginComponent,
    DispositiviComponent,
    SwitchComponent,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule
    

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
