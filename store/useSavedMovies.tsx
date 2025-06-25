import { create } from 'zustand';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  [key: string]: any;
}

interface SavedMovieStore {
  savedMovies: Movie[];
  saveMovie: (movie: Movie) => void;
  removeMovie: (id: number) => void;
  isSaved: (id: number) => boolean;
}

const useSavedMovies = create<SavedMovieStore>((set, get) => ({
  savedMovies: [],
  saveMovie: (movie) => {
    if (!get().isSaved(movie.id)) {
      set((state) => ({
        savedMovies: [...state.savedMovies, movie],
      }));
    }
  },
  removeMovie: (id) => {
    set((state) => ({
      savedMovies: state.savedMovies.filter((m) => m.id !== id),
    }));
  },
  isSaved: (id) => get().savedMovies.some((m) => m.id === id),
}));

export default useSavedMovies;
