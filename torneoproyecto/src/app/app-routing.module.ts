import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'usuarios', component: UsersComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'tournaments', component: TournamentsComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
