
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: signup page jsx for CapySocial
 */

import { useNavigate } from "react-router-dom"
import styles from "./signuppage.module.css"
import DOMAIN from "../services/endpoint";
import axios from "axios"
import { useState } from "react";

export default function SignupPage() {

    const navigate = useNavigate();
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        const username = e.target.username.value;
        const password = e.target.password.value;
        const newUser = { username, password }
        const res = await axios.post(`${DOMAIN}/api/users/`, newUser)
        if (res?.data.success) {
            setMessage(res?.data.message)
            navigate("/login")
        }
        else{
            setMessage(res?.data.message)
        }
    }

    return (
        <div className={styles.signuppage}>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className={styles.input}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" required className={styles.textarea} />
                </div>
                <div className={styles.input}>
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" required className={styles.textarea} />
                </div>
                <button type="submit" className={styles.submitBtn}>Sign Up</button>
            </form>
            <p>{message}</p>
        </div>
    )
}