import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import supabase from '../supabase/database';
import "./pages-css/commentPage.css"

function CommentPage() {
    const game = useLoaderData();
    const [success, setSuccess] = useState(false);

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const commentForm = event.currentTarget;
        const { title, content } = Object.fromEntries(new FormData(commentForm));
        if (
            typeof title === 'string' &&
            typeof content === 'string' &&
            title.trim().length !== 0 &&
            content.trim().length !== 0
        ) {
            const { data, error } = await supabase
                .from('comments')
                .insert([
                    {
                        game_id: game.id,
                        game_name: game.name,
                        comment_title: title,
                        comment_content: content,
                    },
                ])
                .select();
            if (error) {
                // eslint-disable-next-line no-alert
                alert(error.message);
            } else {
                commentForm.reset();
                setSuccess(true);
                console.log(data);
            }
        }
        console.log(game.name);
    };

    return (
        <div>
            <h3>
                Write a review about <br />
                <span style={{ color: "#3ecf8e" }}>{game.name}</span>
            </h3>
            <form className='d-flex flex-column justify-content-center  w-100' onSubmit={handleCommentSubmit}>
                <label className='form-label' htmlFor="title">
                    Title
                </label>
                <input className='form-control' type="text" id="title" name="title" />
                <label className='form-label' htmlFor="content">
                    Comment text
                </label>
                    <textarea className='form-control' type="text" id="content" name="content" placeholder="Write a review..."/>
                <button style={{ color: "white", backgroundColor: "#3ecf8e", fontWeight: "600" }} className='btn btn-custom mt-3' type="submit">
                    {success ? 'Review posted ✅' : 'Publish'}
                </button>
            </form>
        </div>
    );
}

export default CommentPage;
