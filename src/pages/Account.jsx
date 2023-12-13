import { useState, useEffect, useContext } from 'react';
import useProfile from '../hooks/useProfile';
import getProfileImg from '../utils/getProfileImg';
import formatMessageDate from '../utils/formatMessageDate';
import supabase from '../supabase/database';
import AppContext from '../contexts/AppContext';
import "./pages-css/account.css"

function Account() {
    const { session } = useContext(AppContext);
    const { profile, loading } = useProfile();
    const [comments, setComments] = useState([]);
    const [favorites, setFavorites] = useState([]);


    useEffect(() => {
        const getComments = async () => {
            const { data, error } = await supabase
                .from('comments')
                .select('*, profile: profiles(username)')
                .eq('profile_id', session.user.id);
            if (error) {
                // eslint-disable-next-line no-alert
                alert(error.message);
            } else {
                setComments(data);
            }
        };
        getComments();
    }, []);

    useEffect(() => {
        const getFav = async () => {
            const { data, error } = await supabase
                .from('favorites')
                .select('*')
                .eq('profile_id', session.user.id);
            if (error) {
                // eslint-disable-next-line no-alert
                alert(error.message);
            } else {
                setFavorites(data);
            }
        };
        getFav();
    }, []);

    return (
        <div className="container">
            {loading && <progress />}
            <img
                src={profile && getProfileImg(profile.avatar_url)}
                alt="profile"
                width={200}
            />
            <h1>
                Welcome <span style={{ color: "#3ecf8e" }}>{profile && (profile.username || session.user.user_metadata.full_name)}</span>
            </h1>
            <div>
                <h3 className='mt-4'><span style={{textDecoration: "line-through", textDecorationThickness: "15px", textDecorationColor: "#3ecf8e93"}}><span className='position-absolute'>Reviews</span>Reviews</span></h3>
                {comments.map((c) => (
                    <div key={c.id}>
                        <div>
                            <article className='px-3 py-1 mb-3 mt-2 rounded' style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
                                <h5 className='px-2 py-3'>{c.comment_title}</h5>
                                <p className='px-2 py-0'>{c.comment_content}</p>
                                <div>
                                    <p className='px-2 pb-0' style={{ color: "#3ecf8e" }}>
                                        Published by: <span className='text-light'>{c.profile.username}</span><span><p style={{ fontSize: "9px" }} className='m-0'>
                                        {formatMessageDate(c.created_at)}
                                    </p></span>
                                    </p>
                                </div>
                            </article>
                        </div>
                    </div>
                ))}
                <h3 className='mt-4'><span style={{textDecoration: "line-through", textDecorationThickness: "15px", textDecorationColor: "#3ecf8e93"}}><span className='position-absolute'>Favorites</span>Favorites</span></h3>
                <ul>
                    {favorites &&
                        favorites.map((favGame) => (
                            <li key={favGame.id}>{favGame.game_name}</li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default Account;
