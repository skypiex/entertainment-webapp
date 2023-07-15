import React, { useState } from "react";
import Nav from "../components/Nav";
import Search from "../components/Search";
import Trending from "../components/Trending";
import Recommended from "../components/Recommended";
import QueryResults from "../components/QueryResults";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Movies = () => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <div className="lg:flex lg:p-4 gap-4 flex lg:flex-row flex-col">
        <Nav />
        <main className="flex flex-col flex-1 gap-4 p-4">
          <QueryClientProvider client={queryClient}>
            <Search setQuery={setQuery} />
            {query === "" ? (
              <>
                <Trending posterSize="300x150" page="Movies" />
                <Recommended posterSize="200" page="Movies" />
              </>
            ) : (
              <QueryResults posterSize="200" page="Movies" query={query} />
            )}
          </QueryClientProvider>
        </main>
      </div>
    </div>
  );
};

export default Movies;
