import { useEffect, useState } from 'react';
import supabase from '../supabase/database';


function Comments({ game }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getComments = async () => {
            const { data, error } = await supabase
                .from('comments')
                .select('*, profile: profiles(username)')
                .eq('game_id', game.id);
            if (error) {
                alert(error.message);
            } else {
                setComments(data);
            }
            setLoading(false);
        };

        getComments();
    }, [game.id]);

    if (loading) {
        return <p>Loading comments...</p>;
    }

    return (
        <div>
            <h4><span style={{ color: "#3ecf8e" }}>{game.name}</span> Reviews</h4>
            {comments &&
                comments.map((comment) => (
                    <div key={comment.id} className='px-3 py-1 mb-3 rounded' style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
                        <article>
                            <h4>{comment.comment_title}</h4>
                            <p>{comment.comment_content}</p>
                            <div>
                                <p className='m-0' style={{ color: "#3ecf8e" }}>
                                    Published by: {comment.profile.username} <span className='text-secondary'><small style={{ fontSize: "9px" }}>{comment.created_at}</small></span>
                                </p>
                            </div>
                        </article>
                    </div>
                ))}
        </div>
    );
}

export default Comments;
