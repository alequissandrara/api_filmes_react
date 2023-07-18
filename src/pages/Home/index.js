import { Container, Movie, MovieList } from "./styles";
import { APIKey } from '../../config/key'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const [movies, setMovies] = useState([])
    const image_path = 'https://image.tmdb.org/t/p/w500';
   
    useEffect(() => {
        // Consumindo a API..
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`)
            .then(response => response.json())
            .then(data => setMovies(data.results))
    }, [])

    // Função para renderizar as estrelas com base no valor do voto
    const renderStars = (vote) => {
        const numStars = Math.round(vote / 2); // Cada estrela equivale a 0.5 no valor do voto
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= numStars) {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#faab00" }} />);
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#ccc" }} />);
            }
        }

        return stars;
    };

    return (
        <Container>
            <h1>POPULAR MOVIES</h1>
            <MovieList>
                {movies.map(movie => {
                    return (
                        <Movie key={movie.id}>
                            <Link to={`/details/${movie.id}`}>
                                <img src={`${image_path}${movie.poster_path}`} alt={movie.title} />
                                
                            </Link>
                            <span>{movie.title}</span>
                           <span>{renderStars(movie.vote_average)}</span> 
                            
                        </Movie>
                    )
                })}
            </MovieList>
        </Container>
    )
}

export default Home;
