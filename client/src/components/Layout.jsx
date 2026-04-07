import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({children}) => {
    return(
        <div className="flex flex-col min-h-screen">
            <Nav/>
            <main className="flex-grow">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default Layout;