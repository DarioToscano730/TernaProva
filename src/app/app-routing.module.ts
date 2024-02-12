import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DispositiviComponent } from './componenti/dispositivi/dispositivi.component';
import { FormpageComponent } from './componenti/formpage/formpage.component';
import { HomepageComponent } from './componenti/homepage/homepage.component';
import { LoginComponent } from './componenti/login/login.component';
import { PaginaCiscoComponent } from './componenti/pagina-cisco/pagina-cisco.component';
import { PaginaSirtiComponent } from './componenti/pagina-sirti/pagina-sirti.component';
import { PaginaTernaComponent } from './componenti/pagina-terna/pagina-terna.component';
import { RegisterComponent } from './componenti/register/register.component';
import { SwitchComponent } from './componenti/switch/switch.component';


const routes: Routes = [
  { path: '' , redirectTo : 'homepage', pathMatch : 'full'},
  {path : 'homepage', component : HomepageComponent, children: [
      {path : 'formpage', component : FormpageComponent},
      {path : 'paginaterna', component : PaginaTernaComponent},
      {path : 'paginacisco', component : PaginaCiscoComponent},
      {path : 'paginasirti', component : PaginaSirtiComponent},
      {path : 'register', component : RegisterComponent},
      {path : 'login', component : LoginComponent},
      {path : 'dispositivi', component : DispositiviComponent},
      {path : 'switch', component : SwitchComponent},
      
      
      
    ],
  },
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
