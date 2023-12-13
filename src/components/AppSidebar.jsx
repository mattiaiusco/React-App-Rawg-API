import { useLoaderData } from "react-router-dom";
import Genres from "./Genres";
// import Platforms from "./Platforms";

export default function AppSidebar() {
    const {
        genres,
        // platforms
    } = useLoaderData();

    return (
        <div className="d-flex">
            <Genres genres={genres} />
            {/* <Platforms platforms={platforms} /> */}
        </div>
    )
}