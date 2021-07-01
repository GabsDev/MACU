import React, { useEffect, useState } from "react";
import "./App.css";
import AnimalCardList from "./components/cardList";
import SearchBox from "./components/searchBox";

function App() {
  const [animalList, setAnimalList] = useState([]);
  const [searchField, setSearchField] = useState({ searchField: "" });

  const onSearchChange = (event) => {
    setSearchField({ searchField: event.target.value });
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/animals", {
      method: "GET",
      mode: "cors",
    })
      .then((res) => {
        return res.json();
      })

      .then((data) => {
        if (data) {
          setAnimalList(data);
        }
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
    <div className="App">
      <div style={{ backgroundColor: "#282c34" }}>
        <SearchBox searchChange={onSearchChange} />
      </div>

      <header className="App-header">
        <div className="container">
          <AnimalCardList animalList={filterAnimals} />
        </div>
      </header>
    </div>
  );
}

export default App;
