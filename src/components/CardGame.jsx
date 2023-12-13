import "./components-css/CardGame.css"
import { Link } from "react-router-dom"

export default function CardGame({ game }) {
    console.log(game);
    return (
        <div className="col-12 mb-4" key={game.id}>
            <Link to={`/${game.slug}`} style={{ 'textDecoration': 'none' }}>
                <div className="card w-100">
                    <div style={{height: "200px", width: "100%", overflow: "hidden"}}>
                        <img src={game.background_image} className="card-img-top" alt={game.name} />
                    </div>
                    <div className="card-body">
                        <h5 style={{color: "#3ecf8e"}} className="card-title">{game.name}</h5>
                        <p className="card-text">Metascore: {game.metacritic}</p>
                        <small>{game.genres.map((genre) => genre.name).join(', ')}</small>
                    </div>
                </div>
            </Link>
        </div>
    )
}