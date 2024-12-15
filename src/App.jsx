import React, { useState, useEffect, useRef } from 'react';
import Table from './components/Table';
import Eyes from './components/Eyes';
import Pagination from './components/Pagination';
import Filters from './components/Filters';
import CharacterDetails from './components/CharacterDetails';
import axios from 'axios';
import './App.css';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

// The App component is the main component of the entire application and brings together other components
const App = () => {
  // Define state variables

  // Holds all character data
  const [data, setData] = useState([]);

  // Holds the loading state of the data
  const [isLoading, setIsLoading] = useState(true);

  // Holds the filtered character data
  const [filteredData, setFilteredData] = useState([]);

  // Holds the current page number
  const [currentPage, setCurrentPage] = useState(1);

  // Holds the filtering criteria (name, status, and species)
  const [filters, setFilters] = useState({ name: '', status: '', species: '' });

  // Holds the sorting key
  const [sortKey, setSortKey] = useState('');

  // Holds the selected character
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Determines the number of items to display per page
  const pageSize = 6;

  // Holds the animation state
  const [animate, setAnimate] = useState(false);

  // Holds the mouse position (x and y coordinates)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Holds the unique species options
  const [speciesOptions, setSpeciesOptions] = useState([]);

  // Holds the state indicating whether any results were found
  const [noResults, setNoResults] = useState(false);

  // Holds the error state for data fetching
  const [error, setError] = useState(null);

  /**
   * useEffect 1: When data changes, lists unique species and updates the speciesOptions state
   */
  useEffect(() => {
    // Extracts all unique species from the characters and sorts them
    const uniqueSpecies = [...new Set(data.map((char) => char.species))].sort();
    setSpeciesOptions(uniqueSpecies);
  }, [data]);

  /**
   * handleMouseMove: Captures mouse movements and updates the mousePosition state
   * Throttled to improve performance
   * e - Mouse movement event
   */
  const handleMouseMove = useRef(
    throttle((e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }) // Adjust the delay as needed
  ).current;

  /**
   * useEffect 2: Listens for mouse movements and adds the handleMouseMove function as an event listener
   * Cleans up by removing the event listener when the component unmounts
   */
  useEffect(() => {
    // Listen for mouse movements
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  /**
   * handleClick: Starts the animation and stops it after a certain duration
   */
  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500); // Stops the animation after 500ms
  };

  /**
   * useEffect 3: When the component mounts, fetches all character data from the API
   * Uses axios to aggregate data from multiple pages
   */
  useEffect(() => {
    const fetchAllData = async () => {
      let allData = []; // Array to store all data
      let page = 1; // Starting page
      let totalPages = 1; // Total number of pages

      // Fetch data by iterating through all pages
      while (page <= totalPages) {
        try {
          const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
          totalPages = response.data.info.pages; // Updates the total number of pages
          allData = [...allData, ...response.data.results]; // Adds new data to the existing data
          page++;
        } catch (error) {
          console.error('Data fetching error:', error);
          setError('Failed to load character data. Please try again later.');
          break; // Exits the loop in case of an error
        }
      }

      setData(allData); // Sets the data state with all fetched data
      setIsLoading(false); // Sets the loading state to false
    };

    fetchAllData(); // Calls the data fetching function
  }, []);

  /**
   * useEffect 4: When data, filters, or sortKey changes, performs filtering and sorting
   */
  useEffect(() => {
    if (isLoading) return; // If data is still loading, exit early

    let updatedData = [...data]; // Creates a copy of the data

    // Filters by name
    if (filters.name) {
      updatedData = updatedData.filter((char) =>
        char.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Filters by status
    if (filters.status) {
      updatedData = updatedData.filter((char) => char.status === filters.status);
    }

    // Filters by species
    if (filters.species) {
      updatedData = updatedData.filter((char) =>
        char.species.toLowerCase() === filters.species.toLowerCase()
      );
    }

    // Sorts the data based on sortKey
    if (sortKey) {
      updatedData.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    }

    // Checks if any results are found
    setNoResults(updatedData.length === 0);

    setFilteredData(updatedData); // Updates the filteredData state with the filtered and sorted data
  }, [data, filters, sortKey, isLoading]);

  /**
   * useEffect 5: When filters or sortKey change, resets the current page number to 1
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortKey]);

  // Calculates the data for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(startIndex, startIndex + pageSize);

  // Conditional rendering for loading state
  if (isLoading) {
    return <div className="loading">
      <div className="spinner"></div>

    </div>;
  }

  // Conditional rendering for error state
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      {/* Background and decorative elements */}
      <div className="screen-container"></div>
      <img
        src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTE5ZnRuaW54NDlteDgzYzJubnVibXFqeTQxdms2dDQ1ODBmN2NvOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sxwk9hGlsULcYm6hDX/giphy.gif"
        className="screen-container2"
        alt="Decorative GIF"
        aria-hidden="true"
      />
      <div className="rick-morty"></div>

      {/* Main application container */}
      <div className="app-container">
        
        {/* Layer for eye animations */}
        <div className="eyes-layer">
          {/* First Eyes component: Rick's eyes */}
          <Eyes
            mousePosition={mousePosition}
            eyeLeft={{
              x: 185, // Left eye's position (x)
              y: 360, // Left eye's position (y)
              width: 30, // Width of the eye
              height: 30, // Height of the eye
              radius: 11, // Movement radius
            }}
            eyeRight={{
              x: 272, // Right eye's position (x)
              y: 338, // Right eye's position (y)
              width: 30, // Width of the eye
              height: 30, // Height of the eye
              radius: 11, // Movement radius
            }}
          />

          {/* Second Eyes component: Morty's eyes */}
          <Eyes
            mousePosition={mousePosition}
            eyeLeft={{
              x: 1260, // Left eye's position (x)
              y: 430, // Left eye's position (y)
              width: 30, // Width of the eye
              height: 30, // Height of the eye
              radius: 11, // Movement radius
            }}
            eyeRight={{
              x: 1350, // Right eye's position (x)
              y: 430, // Right eye's position (y)
              width: 45, // Width of the eye
              height: 45, // Height of the eye
              radius: 11, // Movement radius
            }}
          />
        </div>

        {/* Title */}
        <h1>Rick & Morty Table</h1>

        {/* Filters and sorting component */}
        <Filters
          filters={filters}
          setFilters={setFilters}
          setSortKey={setSortKey}
          sortKey={sortKey} // Passes the sortKey prop
          speciesOptions={speciesOptions} // Passes the unique species options
        />

        {/* Container for character details and the table */}
        <div className="character-detail-container" onClick={handleClick}>
          {/* Character table */}
          <Table
            data={currentPageData} // Retrieves the data for the current page
            setSelectedCharacter={setSelectedCharacter} // Updates the selected character
            noResults={noResults} // Indicates whether any results were found
          />

          {/* Displays the details of the selected character */}
          {selectedCharacter && (
            <CharacterDetails character={selectedCharacter} animate={animate} />
          )}
        </div>

        {/* Pagination component */}
        <Pagination
          totalItems={filteredData.length} // Total number of filtered items
          pageSize={pageSize} // Number of items per page
          currentPage={currentPage} // Current page number
          setCurrentPage={setCurrentPage} // Updates the current page number
        />
      </div>
    </>
  );
};

export default App;
