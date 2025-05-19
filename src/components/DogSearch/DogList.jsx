import React from 'react';
import DogCard from './DogCard';

function DogList({ dogs, onToggleFavorite, favorites }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(dog.id)}
        />
      ))}
    </div>
  );
}

export default DogList;