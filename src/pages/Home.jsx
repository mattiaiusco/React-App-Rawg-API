import { useEffect, useState } from "react"

export default function Home() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function getGames() {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-11-01,2023-11-30&rating`);
            const json = await response.json();
            console.log(json);
            setGames(json.results);
        }
        getGames();
    }, [])


    return (
        <div>
            <header>
                <hgroup>
                    <h1>New and trendign</h1>
                    <small>Based on player counts and release date</small>
                </hgroup>
            </header>

            <div className="row" style={{"gridTemplateColumns": "repeat(4, 334.75px)"}}>
                {games && games.map((game) => (
                    <div className="col-3">
                        <div className="card" key={game.id} style={{ "width": "18rem" }}>
                            <img src={game.background_image} className="card-img-top" alt={game.name} />
                            <div className="card-body">
                                <h5 className="card-title">{game.name}</h5>
                                <p className="card-text">{game.name}</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}