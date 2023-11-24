import {Link} from "react-router-dom"

export default function Genres({ genres }) {
    return (
        <>
            <div className="dropdown pb-4">
                <button className="btn py-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Genres
                </button>
                <ul className="dropdown-menu" style={{ 'height': '300px', 'overflowY': 'scroll' }}>
                    {genres.map((genre) => (
                        <li key={genre.id}>
                            <Link to={`/games/${genre.slug}`}>
                                {genre.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}