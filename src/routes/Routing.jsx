import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home, { preLoadFilter } from "../pages/Home";
import GenrePage from "../pages/GenrePage";
import PlatformPage from "../pages/PlatformPage";
import GamePage from "../pages/GamePage";
import Login from "../pages/Login";
import Signup from "../pages/Signup"

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
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "games/:genre",
                element: <GenrePage />
            },
            {
                path: "games/:platform",
                element: <PlatformPage />
            },
            {
                path: "game/:game_name",
                element: <GamePage />
            },
        ],
    },
]);