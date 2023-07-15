import { MdLocalMovies, MdBookmarkBorder, MdBookmark } from "react-icons/md";

const MoviePosterSmall = ({ movie, handleBookmarkData, inBookmark }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <img
          className="rounded-md"
          src={`${
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : "https://via.placeholder.com/384x216"
          }`}
          alt="placeholder"
        />
        <button
          onClick={() => handleBookmarkData(movie)}
          className="flex items-center justify-center absolute right-4 top-4 bg-gray-900 bg-opacity-50 rounded-full w-7 h-7 text-xl"
        >
          {inBookmark ? <MdBookmark /> : <MdBookmarkBorder />}
        </button>
      </div>
      <div className="flex gap-1 text-xs text-slate-300">
        <p>{movie.release_date || movie.first_air_date}</p>
        <span>•</span>
        <p className="flex justify-center items-center gap-1">
          <MdLocalMovies />
          <span>{movie.release_date ? "Movie" : "Series"}</span>
        </p>
        <span>•</span>
        <p>{movie.adult ? "18+" : "PG"}</p>
      </div>
      <h2 className="text-sm font-bold">{movie.title || movie.name}</h2>
    </div>
  );
};

export default MoviePosterSmall;
