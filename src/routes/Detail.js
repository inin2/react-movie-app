import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import styles from "./Detail.module.css";

function Detail() {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [movie, setMovie] = useState([]);

	const getMovie = async () => {
		const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
		setMovie(json.data.movie);
		setLoading(false);
		// console.log(json.data.movie);
	}
	useEffect(() => {
		getMovie();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			{loading ? (
				<h1 className={styles.loader}>Loading ...</h1>
			) : (
				<div className={styles.movie}>
					<img src={movie.medium_cover_image} alt={movie.title} className={styles.movie__img} />
					<div className={styles.movie__data}>
						<button onClick={() => { navigate("/react-movie-app"); }}>&lt;</button>
						<h2 className={styles.movie__title}>{movie.title}</h2>
						<p className={styles.movie__year}>{movie.year}</p>
						<p className={styles.movie__rate}>{movie.rating}/10</p>
						<ul className={styles.movie__genres}>
							{movie.genres.map((g) => (
								<li>{g}</li>
							))}
						</ul>
						<p className={styles.movie__summary}>{movie.description_full}</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default Detail;