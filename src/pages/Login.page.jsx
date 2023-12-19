
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: login page jsx for CapySocial
 */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/AuthStore"
import { NavLink } from "react-router-dom"
import styles from "./loginpage.module.css"

export default function LoginPage() {

    const navigate = useNavigate()
    const { loginService, authLoading, user } = useAuthStore((state) => state)
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (!!user) {
            navigate("/capysocial-client/posts")
        }
    }, [user])

    async function onLogin(e) {
        e.preventDefault()
        let username = e.target.username?.value;
        let password = e.target.password?.value
        if (!username || !password) return
        loginService(username, password)
        if (!user) {
            setMessage("Invalid login credentials");
        }
    }

    return (
        <div className={styles.loginpage}>
            <form onSubmit={onLogin}>
                <h2>Login</h2>
                <div className={styles.input}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" required className={styles.textarea} />
                </div>
                <div className={styles.input}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" required className={styles.textarea} />
                </div>
                <button className={styles.submitBtn}>Login</button>
                {authLoading ? <h2>Loading...</h2> : null}
            </form>
            <p>{message}</p>
            <NavLink to="/signup" className={styles.navlink}>Sign Up</NavLink>
        </div>
    )
}