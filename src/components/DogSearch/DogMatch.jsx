import React from "react";
import "../../index/DogMatch.css"; // optional: style this component separately if needed

function DogMatch({ match }) {
    if (!match) return null;

    return (
        <div className="match-result">
            <h4>Your Match! 🐾</h4>
            <div className="dog-card-match">
                <img
                    src={match.img}
                    alt={match.name}
                    className="match-image"
                />
                <div className="match-details">
                    <p><strong>Name:</strong> {match.name}</p>
                    <p><strong>Breed:</strong> {match.breed}</p>
                    <p><strong>Age:</strong> {match.age}</p>
                    <p><strong>Zip Code:</strong> {match.zip_code}</p>
                </div>
            </div>
        </div>
    );
}

export default DogMatch;
