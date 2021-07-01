import React from "react";

const SearchBox = ({ searchChange }) => {
  return (
    <div>
      <input
        className="form-control-lg"
        type="search"
        placeholder="search a animal"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
