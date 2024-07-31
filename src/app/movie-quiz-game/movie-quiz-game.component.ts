import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-quiz-game',
  templateUrl: './movie-quiz-game.component.html',
  styleUrls: ['./movie-quiz-game.component.scss'],
})
export class MovieQuizGameComponent implements OnInit {
  movies: Movie[] = [];
  currentQuestions: any[] = [];
  selectedAnswers: any = {};
  quizOver: boolean = false;
  score: number = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies = this.movieService.movies;
    this.generateQuestions();
  }

  generateQuestions(): void {
    let shuffledMovies = this.movies.sort(() => 0.5 - Math.random());
    this.currentQuestions = shuffledMovies
      .slice(0, 10)
      .map((movie) => this.createQuestion(movie));
  }

  createQuestion(movie: Movie): any {
    let questionType = Math.random() < 0.5 ? 'genre' : 'year';
    if (questionType === 'genre') {
      return {
        text: `What is the genre of the movie "${movie.name}"?`,
        answer: movie.genre,
        options: this.getOptions('genre', movie.genre),
      };
    } else {
      return {
        text: `What is the release year of the movie "${movie.name}"?`,
        answer: movie.year?.toString(),
        options: this.getOptions('year', movie.year?.toString()),
      };
    }
  }

  getOptions(
    type: 'genre' | 'year',
    correctAnswer: string | undefined
  ): string[] {
    let allOptions: { [key: string]: string[] } = {
      genre: Array.from(new Set(this.movies.map((m) => m.genre))),
      year: Array.from(
        new Set(
          this.movies
            .map((m) => m.year?.toString() ?? '')
            .filter((year) => year !== '')
        )
      ),
    };

    let shuffledOptions = allOptions[type].sort(() => 0.5 - Math.random());
    return [
      correctAnswer ?? '',
      ...shuffledOptions.filter((opt) => opt !== correctAnswer).slice(0, 3),
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

  playAgain(): void {
    this.quizOver = false;
    this.generateQuestions();
  }
}
