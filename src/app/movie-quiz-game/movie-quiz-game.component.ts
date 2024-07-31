import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-quiz-game',
  templateUrl: './movie-quiz-game.component.html',
  styleUrl: './movie-quiz-game.component.scss',
})
export class MovieQuizGameComponent implements OnInit {
  movies: Movie[] = [];
  currentQuestion: any[] = []; /// will think about it later
  selectedAnswer: any[] = []; /// will think about it later
  quizOver: boolean = false;
  score: number = 0;

  constructor(public movieService: MovieService) {}

  ngOnInit(): void {
    this.movies = this.movieService.movies;
  }

  generateQuestions(): void {
    let shuffledMovies = this.movies.sort(() => 0.5 - Math.random());
    this.currentQuestion = shuffledMovies.slice(0, 10).map((movie) => ({
      text: `What is the genre of the movie ${movie.name} ?`,
      answer: movie.genre,
      options: this.getOptions(movie.genre),
    }));
  }

  getOptions(correctAnswer: string): string[] {
    const genres = Array.from(new Set(this.movies.map((m) => m.genre)));
    const shuffledGenres = genres.sort(() => 0.5 - Math.random());
    return [
      correctAnswer,
      ...shuffledGenres.filter((g) => g !== correctAnswer).slice(0, 3),
    ].sort(() => 0.5 - Math.random());
  }

  selectAnswer(questionIndex: number, answer: string): void {
    this.selectedAnswers[questionIndex] = answer;
  }

  submitQuiz(): void {
    this.score = this.currentQuestions.reduce(
      (acc, question, index) =>
        acc + (this.selectedAnswers[index] === question.answer ? 1 : 0),
      0
    );
    this.quizOver = true;
  }
}
