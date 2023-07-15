import React, { useContext, useEffect } from "react";
import { BookmarkedContext } from "../BookmarkedContext";
import Movie from "./Movie";
import { app } from "../firebase-config";
import { db } from "../firebase-config";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { doc, collection } from "firebase/firestore";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const BookmarkedQueryResults = ({ posterSize }) => {
  const { setBookmarksTemp } = useContext(BookmarkedContext);

  const auth = getAuth(app);
  const [user] = useAuthState(auth);
  const userRef = doc(db, "users", user?.uid);
  const bookmarkedMoviesRef = collection(userRef, "bookmarked_movies");
  const [bookmarks, loading] = useCollectionData(bookmarkedMoviesRef);

  const [listRef] = useAutoAnimate();

  useEffect(() => setBookmarksTemp(bookmarks), [bookmarks]);

  return (
    <div className="flex-1 flex flex-col gap-2 min-h-screen">
      <h1 className="text-2xl">Bookmarked Movies & TV Shows</h1>
      <ul
        className="flex-1 grid 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4"
        ref={listRef}
      >
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          bookmarks?.length > 0 ? (
            bookmarks?.map((movie, index) => {
              return (
                <Movie
                  key={index}
                  posterSize={posterSize}
                  recommendedMovie={movie}
                />
              );
            })
          ) : (
            <p>Bookmarks is empty!</p>
          )
        ) : (
          <p>Please login to see your bookmarks!</p>
        )}
      </ul>
    </div>
  );
};

export default BookmarkedQueryResults;
