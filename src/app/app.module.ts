import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InputEquationComponent } from './components/input-equation/input-equation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OptionsComponent } from './components/options/options.component';
import { HomeComponent } from './pages/home/home.component';
import { SolverComponent } from './pages/home/solver/solver.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    InputEquationComponent,
    OptionsComponent,
    HomeComponent,
    SolverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
