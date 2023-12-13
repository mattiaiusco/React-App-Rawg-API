import { useEffect, useState } from "react"
import './pages-css/Home.css'
import CardGame from "../components/CardGame";

export async function getGenres() {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}genres?key=${import.meta.env.VITE_API_KEY}`);
    const json = await response.json();
    return json.results
}

export async function getPlatforms() {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}platforms?key=${import.meta.env.VITE_API_KEY}`);
    const json = await response.json();
    return json.results
}

export async function preLoadFilter() {
    const genres = await getGenres();
    const platforms = await getPlatforms();
    return {
        genres,
        platforms
    };
}

export default function Home() {
    const [games1, setGames1] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState(1);

    function handleNextPage() {
        setPagination((prevPagination) => prevPagination + 1);
    }

    function handlePrevPage() {
        pagination >= 1 ? setPagination((prevPagination) => prevPagination - 1) : null;
    }

    function handleSearch(event) {
        return (
            setSearch(event.currentTarget.value)
        )
    }

    //!DEBOUNCING (senza custom hook) per la ricerca di un gioco con un timeout settato durante la digitazione per non generare una chiamata API ad ogni singola pressione della tastiera
    useEffect(() => {
        setLoading(true);
        const timeoutAPI = setTimeout(() => {
            async function getGames1() {
                setGames1([]);
                setError('');
                try {
                    const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page=${pagination}&page_size=21&search=${search}`);
                    if (response.ok) {
                        const json = await response.json();
                        // await new Promise((resolve) => setTimeout(resolve, 1500));  //! ritardo fittizio per far vedere all'utente che c'è un caricamento in attivo
                        setGames1(json.results);
                    } else {
                        setError('Riprova la tua chiamata API')
                    }
                } catch (error) {
                    setError('Errore di tipo Network', error.message)
                }
                setLoading(false)
            }
            getGames1();
        }, 1500);
        //!cleanup dell'evento, di modo che prenda davvero il debouncing
        return () => {
            clearTimeout(timeoutAPI);
        }
    }, [search, pagination])


    return (
        <div>
            <header className="my-5">
                <hgroup>
                    <h1 className="titolo-home">Best rated games</h1>
                    <p>Based on player ratings</p>
                </hgroup>
            </header>

            {error && <p className="text-red">{error}</p>}


            <input className="form-control me-2 mb-5" type="search" placeholder="Search game..." onChange={handleSearch} />

            {loading && <div className="d-flex justify-content-center">
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}

            <div className="row">
                {games1 && games1.map((game) => (
                    <div key={game.id} className="col-12 col-md-4">
                        <CardGame game={game} />
                    </div>
                ))}
                <div className="d-flex justify-content-center mt-5">
                    {pagination == 1 ? '' : <button style={{ color: "white", borderColor: "#3ecf8e", fontWeight: "600" }} className="btn btn-custom p-2 me-4" onClick={handlePrevPage}>Prev page</button>}
                    <button style={{ color: "white", backgroundColor: "#3ecf8e", fontWeight: "600" }} className="btn btn-custom p-2" onClick={handleNextPage}>Next page</button>
                </div>
            </div>

        </div>
    )
}