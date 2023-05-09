import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import items from "./data";
const SearchBar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [loadData, setLoadData] = useState(false);

  const handleOnSelect = (item) => {
    setLoadData(true);
    setSearchValue(item.name);
  };

  const handleOnSearch = (string) => {
    setLoadData(true);
    setSearchValue(string);
  };
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (loadData) {
          navigate(`/searchedDoctor/${searchValue}`);
          // setSearchValue("");
        }
      }
    });
  }, [handleOnSelect]);

  return (
    <div>
      <div style={{ width: "40vw" }}>
        <ReactSearchAutocomplete
          items={items}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
        />
      </div>
    </div>
  );
};

export default SearchBar;
