import { Component } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  movies: Movie[] = [];
  movie: Movie = new Movie();
  movieLocalDB: string = 'movieLocalDB';
  editEnabled: boolean = false;

  constructor() {
    this.seedData();
  }

  seedData() {
    let d = new Movie();
    d.name = 'Test Movie1';
    d.genre = 'Test Genre';
    d.year = 1998;
    d.duration = 128;
    d.ageRating = 12;
    d.imdbScore = 6.9;
    this.movies.push(d);

    d = new Movie();
    d.name = 'Test Movie2';
    d.genre = 'Test Genre';
    d.year = 1996;
    d.duration = 121;
    d.ageRating = 6;
    d.imdbScore = 8.6;
    this.movies.push(d);

    d = new Movie();
    d.name = 'Test Movie3';
    d.genre = 'Test Genre';
    d.year = 2012;
    d.duration = 145;
    d.ageRating = 18;
    d.imdbScore = 6.3;
    this.movies.push(d);
  }
}
