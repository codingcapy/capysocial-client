
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: layout jsx for CapySocial
 */

import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout() {
    return (
        <div >
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}