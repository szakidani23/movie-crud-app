import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopmoviesComponent } from './topmovies/topmovies.component';
import { MovieQuizGameComponent } from './movie-quiz-game/movie-quiz-game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopmoviesComponent,
    MovieQuizGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
