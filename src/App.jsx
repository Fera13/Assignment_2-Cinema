import { useState, useEffect } from "react";
import { MyNavBar } from "./MyNavBar";
import { Movie } from "./Movie";

export default function App() {
  // A variable that will contain a list of movies
  const [movies, setMovies] = useState([]);

  // Run this function when the component mounts
  useEffect(() => {
    // Self-executing asyncronous anonomyous function
    (async () => {
      // Fetch all the movies from the REST api
      // and store them in the state variable movies
      setMovies(await (await fetch("/api/movies")).json());
    })();
  }, []);

  return (
    <div className="App">
      <MyNavBar />
      {/* Loop through all movies and display each movie */}
      {movies.map(({ id, title, description }) => (
        <Movie key={id} title={title} description={description} />
      ))}
    </div>
  );
}
