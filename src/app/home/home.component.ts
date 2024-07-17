import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  movie: Movie = new Movie();
  movieLocalDb: string = 'movieLocalDb';
  editEnabled: boolean = false;
  ascending: boolean = true;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    let json = JSON.parse(localStorage.getItem(this.movieLocalDb) ?? '[]');
    this.movies = Object.values(json).map((x) => Object.assign(new Movie(), x));
  }

  saveData(): void {
    localStorage.setItem(this.movieLocalDb, JSON.stringify(this.movies));
  }

  addMovie(): void {
    this.movies.unshift(Object.assign(new Movie(), this.movie));
    this.movie.resetProperties();
    this.saveData();
  }

  loadForEdit(movie: Movie): void {
    Object.assign(this.movie, movie);
    this.editEnabled = true;
  }

  deleteMovie(movie: Movie): void {
    this.movies = this.movies.filter((x) => x.id !== movie.id);
    this.saveData();
  }

  saveEdits(): void {
    let index = this.movies.findIndex((x) => x.id === this.movie.id);
    this.movies[index] = Object.assign(new Movie(), this.movie);
    this.editEnabled = false;
    this.saveData();
    this.movie.resetProperties();
  }

  cancelEdits(): void {
    this.movie.resetProperties();
    this.editEnabled = false;
  }

  addBtnDisabled(): boolean {
    return (
      this.movie.name === '' ||
      this.movie.name.length < 2 ||
      this.movie.genre === '' ||
      this.movie.genre.length <= 3 ||
      this.movie.year === null ||
      this.movie.year < 1800 ||
      this.movie.duration === null ||
      this.movie.duration < 1 ||
      this.movie.ageRating === null ||
      this.movie.ageRating < 6 ||
      this.movie.imdbScore === null ||
      this.movie.imdbScore < 1 ||
      this.movie.imdbScore > 10
    );
  }

  // Sorting

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
