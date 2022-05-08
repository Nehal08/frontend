import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SolverComponent } from './pages/home/solver/solver.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'solve/:id',
    component: SolverComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
