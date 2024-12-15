import React from 'react';
import "../css/table.css"

// The Table component displays character data in a table format and is used to select a character
const Table = ({ data, setSelectedCharacter, noResults }) => {
  return (
    <>
      {/* 
        If 'noResults' is true, adds 'red-border' and 'shake' classes.
        This is used to add a red border and shake effect to the table.
      */}
      <table className={`character-table ${noResults ? 'red-border shake' : ''}`}>
        
        {/* Section containing table headers */}
        <thead className="table-header">
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Species</th>
          </tr>
        </thead>
        
        {/* Table body */}
        <tbody>
          {/* 
            Maps through the 'data' array to create a table row (tr) for each character.
            Uses the index as the 'key' prop.
            Each row is clickable and calls the 'setSelectedCharacter' function to select the character.
          */}
          {data.map((char, index) => (
            <tr
              key={index}
              className="table-rows"
              onClick={() => setSelectedCharacter(char)}
            >
              {/* Cell displaying the character's name */}
              <td>{char.name || ''}</td>
              
              {/* Cell displaying the character's status */}
              <td>{char.status || ''}</td>
              
              {/* Cell displaying the character's species */}
              <td>{char.species || ''}</td>
              
            </tr>
          ))}
          
          {/* 
            If 'noResults' is true, adds a warning message to the table body.
          */}
          {noResults && (
            <tr>
              <td colSpan="3" className="no-results">
                The character you are looking for is not in the table.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;







