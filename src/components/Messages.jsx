import { useState, useEffect, useRef } from 'react';
import supabase from '../supabase/database';

function Messages({ game }) {
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state
    const chatRef = useRef(null);

    const getMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*, profile: profiles(username)')
                .eq('game_id', game.id);

            if (error) {
                alert(error.message);
            } else {
                setChat(data);
            }
        } finally {
            setLoading(false); // Set loading to false regardless of success or error
        }
    };

    useEffect(() => {
        getMessages();

        const subscription = supabase
            .channel('messages')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                },
                () => getMessages()
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [game.id]);

    if (loading) {
        return <p>Loading messages...</p>; // Display a loading message while fetching data
    }

    return (
        <div className='vh-50 text-light' ref={chatRef}>
            {chat &&
                chat.map((message) => (
                    <article key={message.id}>
                        <p style={{ color: "#3ecf8e" }}>{message.profile.username} <span className='text-secondary'><small style={{fontSize: "9px"}}>{message.created_at}</small></span></p>
                        <div>
                            <p>{message.content}</p>
                        </div>
                    </article>
                ))}
        </div>
    );
}

export default Messages;
