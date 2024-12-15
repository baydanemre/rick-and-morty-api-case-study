import React from 'react';
import "../css/character-details.css"

// The CharacterDetails component receives a character's details and animation state as props
const CharacterDetails = ({ character, animate }) => {
  return (
    // Adds the 'animate' class to the 'character-details' class if the 'animate' prop is true
    <div className={`character-details ${animate ? "animate" : ""}`}>
      
      {/* 
        Image tag that displays the character's image
        Adds the 'animate' class to the 'character-image' class if the 'animate' prop is true
        The src attribute takes the character's image URL
        The alt attribute uses the character's name as alternative text
      */}
      <img
        className={`character-image ${animate ? "animate" : ""}`}
        src={character.image}
        alt={character.name}
      />
      
      {/* 
        Div that contains the character's information
        Adds the 'animate' class to the 'character-infos' class if the 'animate' prop is true
      */}
      <div className={`character-infos ${animate ? "animate" : ""}`}>
        
        {/* Paragraph that displays the character's name */}
        <p><strong>Name:</strong> {character.name}</p>
        
        {/* Paragraph that displays the character's status (e.g., alive/dead) */}
        <p><strong>Status:</strong> {character.status}</p>
        
        {/* Paragraph that displays the character's species (e.g., human, alien) */}
        <p><strong>Species:</strong> {character.species}</p>
        
        {/* Paragraph that displays the character's gender */}
        <p><strong>Gender:</strong> {character.gender}</p>
        
        {/* Paragraph that displays the character's current location */}
        <p><strong>Location:</strong> {character.location.name}</p>
      </div>
    </div>
  );
};

export default CharacterDetails;



