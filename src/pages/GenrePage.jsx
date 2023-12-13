import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import CardGame from "../components/CardGame";

export default function GenrePage() {
    const { genre } = useParams();
    const [genreGames, setGenregames] = useState([]);

    useEffect(() => {
        async function getGenre() {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre}&page_size=21`);
            const json = await response.json();
            setGenregames(json.results)
        }
        getGenre();
    }, [genre])

    return (
        <>
            <h1>{genre} games</h1>
            <div className="row">
                {genreGames && genreGames.map((game) => (
                    <div key={game.id} className="col-4">
                        <CardGame game={game} />
                    </div>
                ))}
            </div>
        </>
    )
}
