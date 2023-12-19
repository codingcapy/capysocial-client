
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: header component jsx for CapySocial
 */

import { NavLink } from "react-router-dom"
import useAuthStore from "../store/AuthStore"
import { getUserIdFromToken } from "../services/jwt.service"
import { useState } from "react"
import { IoHomeSharp } from "react-icons/io5";
import styles from "./header.module.css"
import { RxMagnifyingGlass } from "react-icons/rx";
import useSearchStore from "../store/SearchStore";

export default function Header() {

    const { logoutService, user } = useAuthStore((state) => state)
    const { content, setContent } = useSearchStore((state) => state)
    const [expandedMenu, setExpandedMenu] = useState(window.innerWidth > 500 ? true : false)
    const userId = getUserIdFromToken()

    function toggleMenu() {
        setExpandedMenu(!expandedMenu)
    }

    return (
        <header>
            {expandedMenu && <div className="headerdiv">
                <NavLink to="/capysocial-client/" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>CapySocial</NavLink>
                <NavLink to="/capysocial-client/" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}><IoHomeSharp size={20} /> Home</NavLink>
            </div>}
            {expandedMenu && <div className="headerdiv">
                <div className={styles.searcharea}><RxMagnifyingGlass size={25} className={styles.glass} /> <input type="text" className={styles.textarea} placeholder="Search CapySocial" onChange={(e) => setContent(e.target.value)} /></div>
            </div>}
            {expandedMenu && <div className="headerdiv">
                <NavLink to="/capysocial-client/posts" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>Posts</NavLink>
                {user && <NavLink to="/capysocial-client/posts/create" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>Create</NavLink>}
            </div>}
            {expandedMenu && <div className="headerdiv">
                {!user && <NavLink to="/capysocial-client/login" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>Login</NavLink>}
                {user && <NavLink to={`/capysocial-client/users/${userId.toString()}`} onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>{user.username}</NavLink>}
                {user && <NavLink to="/capysocial-client/" onClick={logoutService}>Logout</NavLink>}
                {!user && <NavLink to="/capysocial-client/signup" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>Sign Up</NavLink>}
            </div>}
            {expandedMenu && <div onClick={toggleMenu} className="hamburger">&#127828;</div>}
            <div className="header-collapsed">
                {!expandedMenu && <NavLink to="/capysocial-client/" className="home">CapySocial</NavLink>}
                {!expandedMenu && <div onClick={toggleMenu} className="hamburger">&#127828;</div>}
            </div>
        </header>
    )
}

