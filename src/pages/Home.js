import React, { useState } from "react";
import Nav from "../components/Nav";
import Search from "../components/Search";
import Trending from "../components/Trending";
import Recommended from "../components/Recommended";
import QueryResults from "../components/QueryResults";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Home = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="lg:flex lg:p-4 gap-4 flex lg:flex-row flex-col">
      <Nav />
      <main className="flex flex-col flex-1 gap-4 p-4">
        <QueryClientProvider client={queryClient}>
          <Search setQuery={setQuery} />
          {query === "" ? (
            <>
              <Trending posterSize="300x150" page="Home" />
              <Recommended posterSize="200" page="Home" />
            </>
          ) : (
            <QueryResults posterSize="200" page="Home" query={query} />
          )}
        </QueryClientProvider>
      </main>
    </div>
  );
};

export default Home;
