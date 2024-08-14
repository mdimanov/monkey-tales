import React from "react";

type SearchResultsProps = {
  search?: string;
  totalCount?: number;
};

const SearchResultsCount = ({ search, totalCount }: SearchResultsProps) => {
  // Handle the case where neither search nor totalCount is provided
  if (search === undefined && totalCount === undefined) {
    return <div className="text-gray-500 text-sm -mb-3">Searching...</div>;
  }

  // Handle the case where both search and totalCount are provided
  if (search) {
    return (
      <div className="text-gray-500 text-sm -mb-3">
        {totalCount} result{totalCount !== 1 ? "s" : ""} found for &quot;
        {search}
        &quot;
      </div>
    );
  }

  // Handle the case where only totalCount is provided (no search term)
  return (
    <div className="text-gray-500 text-sm -mb-3">All tales: {totalCount}</div>
  );
};

export default SearchResultsCount;
