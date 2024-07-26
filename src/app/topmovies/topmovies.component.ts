import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-topmovies',
  templateUrl: './topmovies.component.html',
  styleUrl: './topmovies.component.scss',
})
export class TopmoviesComponent implements OnInit {
  movies: Movie[] = [];
  movie: Movie = new Movie();
  averageScore: number | null = null;

  constructor(public movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.loadData();
    this.movies = this.movieService.movies;
  }

  topRatedMovie(): string {
    return [...this.movies].sort((a, b) => b.imdbScore! - a.imdbScore!)[0].name;
  }

  avgScore(): number {
    let sum = this.movies.map((x) => x.imdbScore).reduce((a, b) => a! + b!);
    this.averageScore = Math.round((sum! / this.movies.length) * 100) / 100; // Math round To 2 Decimals
    return this.averageScore;
  }

  oldestMovie(): string {
    return [...this.movies].sort((a, b) => a.year! - b.year!)[0].name;
  }

  newestMovie(): string {
    return [...this.movies].sort((a, b) => b.year! - a.year!)[0].name;
  }

  longestMovie(): string {
    return [...this.movies].sort((a, b) => b.duration! - a.duration!)[0].name;
  }
}
