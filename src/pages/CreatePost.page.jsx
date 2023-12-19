
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: create post page jsx for CapySocial
 */

import { useNavigate } from "react-router-dom"
import styles from './createpostpage.module.css'
import DOMAIN from "../services/endpoint";
import axios from "axios"
import { getUserIdFromToken } from "../services/jwt.service"
import React, { useState, useEffect } from 'react';

export default function CreatePostPage() {

    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setCurrentTime(new Date());
    //     }, 1000);
    //     return () => clearInterval(intervalId);
    // }, []);

    const formattedDate = currentTime.toLocaleString();

    async function handleSubmit(e) {
        e.preventDefault()
        const title = e.target.title.value;
        const content = e.target.content.value
        const userId = getUserIdFromToken()
        const date = formattedDate
        const edited = false
        const deleted = false
        const newPost = { title, content, userId, date, edited, deleted }
        const res = await axios.post(`${DOMAIN}/api/posts`, newPost)
        if (res?.data.success) {
            navigate("/capysocial-client/")
        }
    }

    return (
        <div className={styles.createpostpage}>
            <form onSubmit={handleSubmit}>
                <h2>Create Post</h2>
                <div className={styles.input}>
                    <label htmlFor="title" >Title</label>
                    <input type="text" name='title' id='title' placeholder="Title" required className={styles.title} />
                </div>
                <div className={styles.input}>
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name='content' id='content' placeholder='Content' required rows="25" cols={window.innerWidth > 500?"40":"35"} className={styles.textarea} />
                </div>
                <button type="submit" className={styles.submitBtn}>Create</button>
            </form>
        </div>
    )
}