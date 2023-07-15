import React from "react";
import { MdSearch } from "react-icons/md";

const Search = ({ setQuery }) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <MdSearch fontSize="1.5em" color="#586488" />
      <input
        placeholder="Search for Movies or TV Shows"
        className="text-slate-300 md:text-xl w-full bg-transparent border-none"
        onChange={(event) => setQuery(event.target.value)}
      />
    </div>
  );
};

export default Search;
