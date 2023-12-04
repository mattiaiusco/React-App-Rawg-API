import useProfile from "../hooks/useProfile"
import { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function Account() {
    const { profile } = useProfile();
    const { session } = useContext(AppContext);


    return (
        <div className="container">
            <h1>{session.user.user_metadata.username || session.user.email}</h1>
            <img src={session.user.user_metadata.avatar_url} alt={ "Avatar " + session.user.user_metadata.username || session.user.email}  />
        </div>
    )
}