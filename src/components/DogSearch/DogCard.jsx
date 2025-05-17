import React from 'react';
import '../../index/DogCard.css'; // Import the CSS

function DogCard({ dog, onToggleFavorite, isFavorite }) {
  return (
    <div className="dog-card">
      <img
        src={dog.img}
        alt={dog.name}
        className="dog-image"
      />
      <h3>{dog.name}</h3>
      <p><strong>Breed:</strong> {dog.breed}</p>
      <p><strong>Age:</strong> {dog.age}</p>
      <p><strong>Zip Code:</strong> {dog.zip_code}</p>
      <button
        className={`favorite-button ${isFavorite ? 'remove' : 'add'}`}
        onClick={() => onToggleFavorite(dog.id)}
      >
        {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default DogCard;
