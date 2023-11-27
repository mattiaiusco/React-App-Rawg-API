import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function GamePage() {
    const { game_name } = useParams();
    const [ gameDetail, setGameDetail ] = useState('');

    useEffect(() => {
        async function getDetails() {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games/${game_name}?key=${import.meta.env.VITE_API_KEY}`);
            const json = await response.json();
            setGameDetail(json);
        }
        getDetails();
    }, [])

    return (
        <div style={{"backgroundColor": "{gameDetail.dominant_color}!important" }}>
            <h1>{gameDetail.name}</h1>
            <img className="img-fluid" src={gameDetail.background_image} alt="" />
            <p className="pt-4 pb-5">{gameDetail.description_raw}</p>
            <h3>Metascore: {gameDetail.metacritic}</h3>
        </div>
    )
}