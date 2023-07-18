import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { APIKey } from "../../config/key";
import { Container } from "./styles";

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    sinopese: "",
    image: "",
    releaseDate: "",
    vote: "",
  });
  const image_path = 'https://image.tmdb.org/t/p/w500';
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => {
        const movieData = {
          id,
          title: data.title,
          sinopese: data.overview,
          image: `${image_path}${data.poster_path}`,
          releaseDate: data.release_date,
          vote: data.vote_average
        };
        setMovie(movieData);
      })
      .catch(error => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  return (
    <Container>
      <div className="movie">
        <img src={movie.image} alt={movie.sinopese} /> 
        <div className="details"> 
          <h1>{movie.title}</h1> 
          <span>Sinopse: {movie.sinopese}</span>
          <span className="release-date">Release date: {movie.releaseDate}</span> 
          <span className="vote">Vote: {movie.vote}</span>
          <Link to="/"><button>Go back</button></Link>
           
        </div> 
      </div> 
    </Container>
  );
}

export default Details;
