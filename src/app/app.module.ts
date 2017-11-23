
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashoboardComponent } from './dashoboard/dashoboard.component';
import { PreviewComponent } from './preview/preview.component';
import { SitesComponent } from './sites/sites.component';
import { ListsComponent } from './lists/lists.component';
import { HttpModule } from '@angular/http';
import { NotfoundComponent } from './notfound/notfound.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashoboardComponent,
    PreviewComponent,
    SitesComponent,
    ListsComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule, HttpModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'dashboard', component: DashoboardComponent},
      {path: '**', component: NotfoundComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
