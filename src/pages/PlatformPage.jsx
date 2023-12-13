import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardGame from "../components/CardGame";

export default function PlatformPage() {
    const { platform } = useParams();
    const [platformGames, setPlatformgames] = useState([]);

    useEffect(() => {
        async function getPlatform() {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&platforms=${platform}&page_size=21`);
                console.log(json);
                const json = await response.json();

                // Verifica se la risposta contiene l'array 'results'
                if (json.results) {
                    setPlatformgames(json.results);
                } else {
                    console.error("Dati non validi ottenuti dalla chiamata API.");
                }
            } catch (error) {
                console.error("Errore nella chiamata API:", error);
            }
        }
        getPlatform();
    }, [platform]);

    return (
        <>
            <h1>{platform} games</h1>
            <div className="row">
                {platformGames && platformGames.map((game) => (
                    <div key={game.id} className="col-4">
                        <CardGame game={game} />
                    </div>
                ))}
            </div>
        </>
    );
}
