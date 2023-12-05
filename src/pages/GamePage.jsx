import { useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import supabase from "../supabase/database";
import Messages from "../components/Messages";

export default function GamePage() {
    // const game = useLoaderData();
    const { game_name } = useParams();
    const [gameDetail, setGameDetail] = useState('');
    const { profile } = useProfile();

    useEffect(() => {
        async function getDetails() {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games/${game_name}?key=${import.meta.env.VITE_API_KEY}`);
            const json = await response.json();
            setGameDetail(json);
        }
        getDetails();
    }, [])

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const inputForm = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputForm));
        if (typeof message === 'string' && message.trim().length !== 0) {
            const { data, error } = await supabase
                .from('messages')
                .insert([
                    {
                        profile_id: profile.id,
                        game_id: gameDetail.id,
                        content: message,
                    },
                ])
                .select();
                if (error) {
                    alert(error.message);
                } else {
                    inputForm.reset();
                    // console.log(data);
                }
            }
        };
        

    return (
        <>
            <div style={{ backgroundColor: gameDetail.dominant_color }}>
                <h1>{gameDetail.name}</h1>
                <img className="img-fluid" src={gameDetail.background_image} alt="" />
                <p className="pt-4 pb-5">{gameDetail.description_raw}</p>
                <h3>Metascore: {gameDetail.metacritic}</h3>
            </div>
            {profile &&
                <div>
                    <form className="pt-5" onSubmit={handleMessageSubmit}>
                        <div className="mb-3 d-flex align-items-center justify-content-between">
                            <input type="text" name="message" className="form-control" placeholder="Write your review..." />
                            <button style={{ color: "#3ecf8e" }} type="submit" role="button" className="btn">Submit</button>
                        </div>
                    </form>
                    <Messages profile={profile} game={gameDetail} />
                </div>
            }
        </>
    )
}