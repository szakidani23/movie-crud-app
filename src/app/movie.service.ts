import { Injectable } from '@angular/core';
import { Movie } from './models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies: Movie[] = [];
  movie: Movie = new Movie();
  movieLocalDb: string = 'movieLocalDb';
  ascending: boolean = true;

  constructor() {}

  // CRUD - Read
  loadData(): void {
    let json = JSON.parse(localStorage.getItem(this.movieLocalDb) ?? '[]');
    this.movies = Object.values(json).map((x) => Object.assign(new Movie(), x));
  }

  /// Sorting the table
  sortByName(): void {
    this.movies.sort((a, b) =>
      this.ascending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    this.ascending = !this.ascending;
  }

  sortByGenre(): void {
    this.movies.sort((a, b) =>
      this.ascending
        ? a.genre.localeCompare(b.genre)
        : b.genre.localeCompare(a.genre)
    );
    this.ascending = !this.ascending;
  }

  sortByYear(): void {
    this.movies.sort((a, b) =>
      this.ascending ? a.year! - b.year! : b.year! - a.year!
    );
    this.ascending = !this.ascending!;
  }

  sortByDuration(): void {
    this.movies.sort((a, b) =>
      this.ascending ? a.duration! - b.duration! : b.duration! - a.duration!
    );
    this.ascending = !this.ascending;
  }

  sortByAgeRating(): void {
    this.movies.sort((a, b) =>
      this.ascending ? a.ageRating! - b.ageRating! : b.ageRating! - a.ageRating!
    );
    this.ascending = !this.ascending;
  }

  sortByScore(): void {
    this.movies.sort((a, b) =>
      this.ascending ? a.imdbScore! - b.imdbScore! : b.imdbScore! - a.imdbScore!
    );
    this.ascending = !this.ascending;
  }
}
