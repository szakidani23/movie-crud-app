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
  ascending: boolean = true;
  averageScore: number | null = null;

  loadData(): void {
    let json = JSON.parse(localStorage.getItem(this.movieLocalDb) ?? '[]');
    this.movies = Object.values(json).map((x) => Object.assign(new Movie(), x));
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

  /// Sorting
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
  sortByScore(): void {
    this.movies.sort((a, b) =>
      this.ascending ? a.imdbScore! - b.imdbScore! : b.imdbScore! - a.imdbScore!
    );
    this.ascending = !this.ascending;
  }
}
