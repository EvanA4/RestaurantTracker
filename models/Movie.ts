import mongoose from "mongoose";

export interface IMovie {
  _id: string;
  plot: string;
  genres: string[];
  runtime: number;
  cast: string[];
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: string;
  directors: string[];
  rated: string;
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  lastupdated: string;
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  countries: string[];
  type: string;
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    fresh: number;
    critic: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    rotten: number;
    lastUpdated: string;
  };
  num_mflix_comments: number;
}

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  plot: { type: String, required: true },
  year: { type: Number, required: true }, // definitely missed a few things here...

  // createdAt: {
  //   type: Date,
  //   default: () => Date.now(),
  // }
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);
export { Movie };
