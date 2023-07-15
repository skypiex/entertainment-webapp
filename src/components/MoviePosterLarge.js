import { MdLocalMovies, MdBookmarkBorder, MdBookmark } from "react-icons/md";

const MoviePosterLarge = ({ movie, handleBookmarkData, inBookmark }) => {
  return (
    <div className="mr-4 relative">
      <div className="relative">
        <img
          className="rounded-md md:w-96 w-80 h-auto brightness-50"
          src={`${
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
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
      <div className="flex justify-center items-center gap-1 text-xs absolute left-4 md:top-40 top-32">
        <p>{movie.release_date || movie.first_air_date}</p>
        <span>•</span>
        <p className="flex justify-center items-center gap-1">
          <MdLocalMovies />
          <span>{movie.release_date ? "Movie" : "Series"}</span>
        </p>
        <span>•</span>
        <p>{movie.adult ? "18+" : "PG"}</p>
      </div>
      <h2 className="font-bold absolute left-4 w-11/12 truncate md:top-44 top-36">
        {movie.title || movie.name}
      </h2>
    </div>
  );
};

export default MoviePosterLarge;
