import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-topmovies',
  templateUrl: './topmovies.component.html',
  styleUrl: './topmovies.component.scss',
})
export class TopmoviesComponent implements OnInit {
  ngOnInit(): void {
    this.loadData();
  }
  movies: Movie[] = [];
  movie: Movie = new Movie();
  movieLocalDb: string = 'movieLocalDb';

  loadData(): void {
    let json = JSON.parse(localStorage.getItem(this.movieLocalDb) ?? '[]');
    this.movies = Object.values(json).map((x) => Object.assign(new Movie(), x));
  }
}
