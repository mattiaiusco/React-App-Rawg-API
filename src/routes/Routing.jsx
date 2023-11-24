import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home, { preLoadFilter } from "../pages/Home";
import GenrePage from "../pages/GenrePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: preLoadFilter,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "games/:genre",
                element: <GenrePage />
            }
            
        ]
    },
]);