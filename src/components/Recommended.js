import React, { useState } from "react";
import Movie from "./Movie";
import { useQuery } from "@tanstack/react-query";
import request from "../utils/Request";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Recommended = ({ posterSize, page }) => {
  const [loadingComponent, setLoadingComponent] = useState([...Array(30)]);
  const { data, isLoading } = useQuery(["recommended"], async () => {
    const requestRecommendedMovies = await fetch(request.recommendedMovies);
    const recommendedMovies = await requestRecommendedMovies.json();

    const requestRecommendedShows = await fetch(request.recommendedShows);
    const recommendedShows = await requestRecommendedShows.json();

    switch (page) {
      case "Movies":
        return recommendedMovies.results.map((recommendedMovie) => ({
          ...recommendedMovie,
          isBookmark: false,
        }));
      case "Shows":
        return recommendedShows.results.map((recommendedShow) => ({
          ...recommendedShow,
          isBookmark: false,
        }));
      default:
        return [...recommendedMovies.results, ...recommendedShows.results].map(
          (movie) => ({ ...movie, isBookmark: false })
        );
    }
  });

  const [listRef] = useAutoAnimate();

  return (
    <div className="flex-1 flex flex-col gap-2">
      <h1 className="text-2xl">Recommended {page === "Home" ? "" : page}</h1>
      <ul
        className="grid 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4"
        ref={listRef}
      >
        {isLoading
          ? loadingComponent.map((img, index) => {
              return (
                <li
                  className="inline-block snap-start rounded-md w-auto h-72 bg-gray-300 blur-sm"
                  key={index}
                ></li>
              );
            })
          : data?.map((recommendedMovie, index) => {
              return (
                <Movie
                  key={index}
                  posterSize={posterSize}
                  recommendedMovie={recommendedMovie}
                />
              );
            })}
      </ul>
    </div>
  );
};

export default Recommended;
