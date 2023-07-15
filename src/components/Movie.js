import React, { useContext, useEffect, useState } from "react";
import { BookmarkedContext } from "../BookmarkedContext";
import { app } from "../firebase-config";
import { db } from "../firebase-config";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import MoviePosterLarge from "./MoviePosterLarge";
import MoviePosterSmall from "./MoviePosterSmall";
import { toast } from "react-toastify";

const Movie = ({ posterSize, trendingMovie, recommendedMovie }) => {
  const { bookmarksTemp, setBookmarksTemp } = useContext(BookmarkedContext);
  const [inBookmark, setInBookmark] = useState(false);

  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);

  
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const bookmarkedRef = collection(userRef, "bookmarked_movies");
        const docSnapshot = await getDocs(bookmarkedRef);

        const docSnapshotData = docSnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        const currMovie = trendingMovie ? trendingMovie : recommendedMovie;

        const isInDB = docSnapshotData.find(
          (data) => {
            const title = currMovie.hasOwnProperty("title") ? currMovie.title : currMovie.name
            return data.title === title
          });

        if (isInDB) {
          setInBookmark(true);
        } else {
          setInBookmark(false);
        }
      }
    };

    fetchData();
  }, [loading]);

  const handleBookmarkData = async (movie) => {
    if (!user) {
      alert("You must be login to add bookmark");
      return;
    }

    try {
      const userRef = doc(db, "users", user?.uid);
      const bookmarkedRef = collection(userRef, "bookmarked_movies");
      const docSnapshot = await getDocs(bookmarkedRef);

      const docSnapshotData = docSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      const currentMovieRefIdx = bookmarksTemp.findIndex(
        (bookmark) => bookmark.title === movie.title
      );

      if (currentMovieRefIdx !== -1) {
        deleteDoc(
          doc(
            userRef,
            "bookmarked_movies",
            docSnapshotData[currentMovieRefIdx].id
          )
        );

        toast.error(`${"title" in movie ? movie.title : movie.name} has been removed from bookmarked!`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        const newDocSnapshot = await getDocs(bookmarkedRef);
        const newDocSnapshotData = newDocSnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        setBookmarksTemp(newDocSnapshotData);
        setInBookmark(false);
      } else {
        addDoc(bookmarkedRef, {
          title: "title" in movie ? movie.title : movie.name,
          release_date:
            "release_date" in movie ? movie.release_date : movie.first_air_date,
          poster_path: movie.poster_path,
          adult: movie.adult ? "18+" : "PG",
          isBookmark: true,
        });

        toast.success(`${"title" in movie ? movie.title : movie.name} has been added to bookmarked!`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        const newDocSnapshot = await getDocs(bookmarkedRef);
        const newDocSnapshotData = newDocSnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        setBookmarksTemp(newDocSnapshotData);
        setInBookmark(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {posterSize === "300x150" ? (
        <MoviePosterLarge
          movie={trendingMovie}
          inBookmark={inBookmark}
          handleBookmarkData={handleBookmarkData}
        />
      ) : (
        <MoviePosterSmall
          movie={recommendedMovie}
          inBookmark={inBookmark}
          handleBookmarkData={handleBookmarkData}
        />
      )}
    </>
  );
};

export default Movie;
