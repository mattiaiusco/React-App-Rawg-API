export default function CardGame({ game }) {
    return (
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
    )
}