import { useEffect, useState } from "react"
import './pages-css/Home.css'

export default function Home() {
    const [games1, setGames1] = useState([]);
    const [games2, setGames2] = useState([]);
    const [games3, setGames3] = useState([]);

    useEffect(() => {
        async function getGames1() {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-10-01,2023-11-30&rating`);
            const json = await response.json();
            console.log(json);
            setGames1(json.results);
        }
        async function getGames2() {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-08-01,2023-09-30&rating`);
            const json = await response.json();
            setGames2(json.results);
        }
        async function getGames3() {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-06-01,2023-07-30&rating`);
            const json = await response.json();
            setGames3(json.results);
        }
        getGames1();
        getGames2();
        getGames3();
    }, [])


    return (
        <div>
            <header className="my-5">
                <hgroup>
                    <h1 className="titolo-home">Latest games</h1>
                    <p>Based on player counts and release date</p>
                </hgroup>
            </header>

            <div className="row">
                <div className="col-4">
                    {games1 && games1.map((game) => (
                        <div className="col-12 mb-4" key={game.id}>
                            <a href="#" style={{ 'textDecoration': 'none' }}>
                                <div className="card w-100">
                                    <img src={game.background_image} className="card-img-top" alt={game.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{game.name}</h5>
                                        <p className="card-text">{game.name}</p>
                                        <small>{game.genres.map((genre) => genre.name).join(', ')}</small>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                <div className="col-4">
                    {games2 && games2.map((game) => (
                        <div className="col-12 mb-4" key={game.id}>
                            <a href="#" style={{ 'textDecoration': 'none' }}>
                                <div className="card w-100">
                                    <img src={game.background_image} className="card-img-top" alt={game.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{game.name}</h5>
                                        <p className="card-text">{game.name}</p>
                                        <small>{game.genres.map((genre) => genre.name).join(', ')}</small>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                <div className="col-4">
                    {games3 && games3.map((game) => (
                        <div className="col-12 mb-4" key={game.id}>
                            <a href="#" style={{ 'textDecoration': 'none' }}>
                                <div className="card w-100">
                                    <img src={game.background_image} className="card-img-top" alt={game.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{game.name}</h5>
                                        <p className="card-text">{game.name}</p>
                                        <small>{game.genres.map((genre) => genre.name).join(', ')}</small>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}