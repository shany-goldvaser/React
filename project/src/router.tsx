import { createBrowserRouter, Outlet } from "react-router";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <><Outlet /><NavBar /></>,
        children: [
            { path: '/about', element: <About /> },
            { path: '/home', element: <Home /> },
        ]
    }
])