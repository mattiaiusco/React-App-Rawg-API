import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home, { preLoadFilter } from "../pages/Home";
import GenrePage from "../pages/GenrePage";
// import PlatformPage from "../pages/PlatformPage";
import GamePage, {getSingleGame} from "../pages/GamePage";
import Login from "../pages/Login";
import Signup from "../pages/Signup"
import Account from "../pages/Account";
import ProtectedRoute from "../components/ProtectedRoute";
import Settings from "../pages/Settings";
import CommentPage from "../pages/CommentPage";

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
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/account",
                        element: <Account />
                    },
                    {
                        path: "/settings",
                        element: <Settings />
                    }
                ]
            },
            {
                path: "games/:genre",
                element: <GenrePage />
            },
            // {
            //     path: "games/:platform",
            //     element: <PlatformPage />
            // },
            {
                path: "/:game_name",
                element: <GamePage />,
                loader: getSingleGame,
            },
            {
                path: "game/:id/comment",
                element: <CommentPage />,
                loader: getSingleGame,
            },
        ],
    },
]);