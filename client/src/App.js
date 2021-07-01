import React, { useEffect, useState } from "react";
import "./App.css";
import AnimalCardList from "./components/cardList";
import SearchBox from "./components/searchBox";

function App() {
  const [animalList, setAnimalList] = useState([]);
  const [searchField, setSearchField] = useState({ searchField: "" });
  const [errorField, setErrorField] = useState({ searchField: "" });

  const onSearchChange = (event) => {
    setSearchField({ searchField: event.target.value });
  };

  let emptyArray = [];

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/animal", {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        return res.json();
      })

      .then((data) => {
        console.log(data);

        if (data.message === "🔍 - Not Found - /api/v1/animal") {
          setAnimalList(emptyArray);
        } else {
          setAnimalList(data);
        }
      })
      .catch((error) => {
        setAnimalList(emptyArray);
      });
  }, []); // eslint-disable-line

  useEffect(() => {
    console.log(searchField);
  }, [searchField]); // eslint-disable-line

  const filterAnimals = animalList.filter((animalSearch) => {
    return animalSearch.name
      .toLocaleLowerCase()
      .includes(searchField.searchField);
  });

  return !animalList.length ? (
    <h1>Loading</h1>
  ) : (
    <div className="App" style={{ backgroundColor: "#282c34", height: "90em" }}>
      <div style={{ backgroundColor: "#282c34" }}>
        <h1 style={{ color: "white" }}>MACU Code Challenge</h1>
        <br />
        <h1 style={{ color: "white" }}>Animals List</h1>
        <SearchBox searchChange={onSearchChange} />
      </div>

      <div className="m-6" style={{ display: "inline-flex" }}>
        <div className="flex-row" style={{ justifyContent: "space-between" }}>
          {errorField ? (
            <h1>errorField</h1>
          ) : (
            <AnimalCardList animalList={filterAnimals} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
