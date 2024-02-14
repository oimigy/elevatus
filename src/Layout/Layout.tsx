import React from "react";
import NavBar from "../components/Navbar/NavBar";
import {Outlet} from "react-router-dom";
import StoreProvider from "../components/StoreProvider/StoreProvider";

const Layout = () => {
    return (
        <StoreProvider>
            <NavBar/>
            <Outlet/>
        </StoreProvider>
    )
}

export default Layout;