import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import supabase from "../supabase/database";
import Messages from "../components/Messages";
import Comments from "../components/Comments";
import AppContext from "../contexts/AppContext";
import "./pages-css/gamePage.css";

export async function getSingleGame({ params }) {
    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}games/${params.id}?key=${import.meta.env.VITE_API_KEY}`
    );
    const json = await response.json();
    return json;
}

export default function GamePage() {
    const { session } = useContext(AppContext);
    const { profile } = useProfile();
    const { game_name } = useParams();
    const [gameDetail, setGameDetail] = useState('');
    const [fav, setFav] = useState({
        list: [],
        isFavorite: false,
        loading: false,
    });

    const getFavGame = async () => {
        setFav((prevFav) => ({ ...prevFav, loading: true }));

        const { data, error } = await supabase
            .from('favorites')
            .select('*')
            .eq('game_id', gameDetail.id)
            .eq('profile_id', session.user.id);

        if (error) {
            alert(error.message);
        } else {
            setFav({
                list: [...data],
                isFavorite: data.length > 0,
                loading: false,
            });
        }
    };

    const addToFavorites = async () => {
        const { error } = await supabase
            .from('favorites')
            .insert([
                {
                    game_id: gameDetail.id,
                    game_name: gameDetail.name,
                },
            ])
            .select();
        if (error) {
            alert(error.message);
        } else {
            getFavGame();
        }
    };

    const removeFromFavorites = async () => {
        if (!session || !session.user) {
            return;
        }

        console.log('Before removal - gameDetail.id:', gameDetail.id);
        console.log('Before removal - session.user.id:', session.user.id);

        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('game_id', gameDetail.id)
            .eq('profile_id', session.user.id);

        console.log('Remove from favorites error:', error);

        if (error) {
            alert(error.message);
        } else {
            getFavGame();
        }
    };

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const inputForm = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputForm));
        if (typeof message === 'string' && message.trim().length !== 0) {
            const { error } = await supabase
                .from('messages')
                .insert([
                    {
                        profile_id: session.user.id,
                        game_id: gameDetail.id,
                        content: message,
                    },
                ])
                .select();
            if (error) {
                alert(error.message);
            } else {
                inputForm.reset();
            }
        }
    };
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games/${game_name}?key=${import.meta.env.VITE_API_KEY}`);
            const json = await response.json();
            setGameDetail(json);
        }

        fetchData();
    }, [game_name, session]);

    useEffect(() => {
        if (gameDetail && session) {
            getFavGame();
        }
    }, [gameDetail, session]);

    useEffect(() => {
        async function getDetails() {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games/${game_name}?key=${import.meta.env.VITE_API_KEY}`);
            const json = await response.json();
            setGameDetail(json);
        }
        getDetails();
    }, [])

    return (
        <>
            <div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-auto">
                        <h1>{gameDetail.name}</h1>
                    </div>
                    {session ? (
                    <div className="col-auto">
                        {fav.isFavorite ? (
                        <div className="d-flex align-items-center">
                            <button
                                style={{ fontSize: "1.5rem", color: "#3ecf8e", fontWeight: "600" }}
                                className="btn btn-custom rounded-pill"
                                type="submit"
                                onClick={removeFromFavorites}
                                disabled={fav.loading}
                            >
                                <i className="fa-solid fa-heart"></i>
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center">
                            <button
                                style={{ fontSize: "1.5rem", color: "white", fontWeight: "600" }}
                                className="btn btn-custom rounded-pill"
                                type="submit"
                                onClick={addToFavorites}
                                disabled={fav.loading}
                            >
                                <i className="fa-regular fa-heart"></i>
                            </button>
                        </div>
                    )}
                    </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                <img className="img-fluid" src={gameDetail.background_image} alt="" />
                <p className="pt-4 pb-5">{gameDetail.description_raw}</p>
                <h3>Metascore: <span className={gameDetail.metacritic >= 90 ? 'score overNinety' : 'score'}>{gameDetail.metacritic}</span></h3>
                <Comments game={gameDetail} />
            </div>
            {profile && (
                <div>
                    <Link to={`/game/${gameDetail.id}/comment`}>
                        <button style={{ color: "white", backgroundColor: "#3ecf8e", fontWeight: "600" }} className="btn btn-custom p-2">Write a review</button>
                    </Link>
                    <form className="pt-5" onSubmit={handleMessageSubmit}>
                        <div className="mb-3 d-flex align-items-center justify-content-between">
                            <input type="text" name="message" className="form-control" placeholder="Chat with other players..." />
                            <button style={{ color: "#3ecf8e" }} type="submit" role="button" className="btn">Submit</button>
                        </div>
                    </form>
                    <Messages game={gameDetail} />
                </div>
            )}
        </>
    )
}