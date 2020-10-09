import { HeroesComponent } from './pages/heroes/heroes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeComponent } from './pages/heroe/heroe.component';

const routes: Routes = [

  {path: 'heroes', component: HeroesComponent},
  {path: 'heroe/:id', component: HeroeComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'heroes'}

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes, { useHash: true } )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
