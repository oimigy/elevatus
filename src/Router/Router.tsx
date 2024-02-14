import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import React from "react";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Details from "../pages/Details/Details";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/details/:uuid", element: <Details/>},
        ]
    },
]);

export default router;