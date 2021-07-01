import React from "react";

const AnimalCard = (Props) => {
  const { name, species } = Props;
  return (
    <>
      <div
        className="card"
        style={{ backgroundColor: "gray", margin: 10, padding: 5 }}
      >
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text ">{species}</p>
        </div>
      </div>
    </>
  );
};

export default AnimalCard;
