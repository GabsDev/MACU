import React from "react";
import AnimalCard from "./card";

const AnimalCardList = (Props) => {
  const { animalList } = Props;
  return (
    <>
      {animalList.map((animal, index) => {
        return (
          <div key={index} style={{ width: "30%" }}>
            <AnimalCard name={animal.name} species={animal.species} />
          </div>
        );
      })}
    </>
  );
};
export default AnimalCardList;
