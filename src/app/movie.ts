import { Guid } from 'guid-typescript';
export class Movie {
  id: string = Guid.create().toString();
  name: string = '';
  genre: string = '';
  year: number | null = null;
  duration: number | null = null;
  ageRating: number | null = null;
  imdbScore: number | null = null;

  resetProperties() {
    this.id = Guid.create().toString();
    this.name = '';
    this.genre = '';
    this.year = null;
    this.duration = null;
    this.ageRating = null;
    this.imdbScore = null;
  }
}
