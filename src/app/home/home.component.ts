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
}
