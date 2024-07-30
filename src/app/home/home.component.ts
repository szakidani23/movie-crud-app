import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  movie: Movie = new Movie();
  editEnabled: boolean = false;

  constructor(public movieService: MovieService) {}

  /// CRUD - READ
  ngOnInit(): void {
    this.movieService.loadData();
    this.movies = this.movieService.movies;
    if (this.movies.length === 0) {
      this.defaultMoviesLoad();
      this.saveData();
    }
  }

  saveData(): void {
    this.movieService.saveData(this.movies);
  }

  /// CRUD - Create

  addMovie(): void {
    this.movies.unshift(Object.assign(new Movie(), this.movie));
    this.movie.resetProperties();
    this.saveData();
  }

  loadForEdit(movie: Movie): void {
    Object.assign(this.movie, movie);
    this.editEnabled = true;
  }

  /// CRUD - Delete

  deleteMovie(movie: Movie): void {
    console.log('Deleting movie:', movie);
    this.movies = this.movies.filter((x) => x.id !== movie.id);
    console.log('Remaining movies:', this.movies);
    this.saveData();
    this.movies = [...this.movies];
  }

  /// CRUD - Update

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
      this.movie.name.length > 25 ||
      this.movie.genre === '' ||
      this.movie.genre.length <= 3 ||
      this.movie.genre.length > 20 ||
      this.movie.year === null ||
      this.movie.year < 1800 ||
      this.movie.duration === null ||
      this.movie.duration < 1 ||
      this.movie.duration > 999 ||
      this.movie.ageRating === null ||
      this.movie.ageRating < 6 ||
      this.movie.ageRating > 18 ||
      this.movie.imdbScore === null ||
      this.movie.imdbScore < 1 ||
      this.movie.imdbScore > 10
    );
  }

  /// Limit imdbScore's input field to max 1 decimals
  /// Code from StackOverflow
  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,1})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  defaultMoviesLoad(): void {
    let d = new Movie();
    d.name = 'Shaun of the Dead (default)';
    d.genre = 'Comedy / Horror';
    d.year = 2004;
    d.duration = 99;
    d.ageRating = 16;
    d.imdbScore = 7.9;
    this.movies.push(d);

    d = new Movie();
    d.name = 'Idiocracy (default)';
    d.genre = 'Comedy';
    d.year = 2006;
    d.duration = 84;
    d.ageRating = 12;
    d.imdbScore = 6.5;
    this.movies.push(d);

    d = new Movie();
    d.name = 'Inception (default)';
    d.genre = 'Adventure / Action';
    d.year = 2010;
    d.duration = 148;
    d.ageRating = 16;
    d.imdbScore = 8.8;
    this.movies.push(d);

    d = new Movie();
    d.name = `Harry Potter and the Sorcerer's Stone (default)`;
    d.genre = 'Adventure / Action';
    d.year = 2001;
    d.duration = 152;
    d.ageRating = 14;
    d.imdbScore = 7.6;
    this.movies.push(d);
  }
}
