import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopmoviesComponent } from './topmovies/topmovies.component';
import { HomeComponent } from './home/home.component';
import { MovieQuizGameComponent } from './movie-quiz-game/movie-quiz-game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'topmovies', component: TopmoviesComponent },
  { path: 'movie-quiz-game', component: MovieQuizGameComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
  { path: 'page-not-found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
