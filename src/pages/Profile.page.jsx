
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: profile page jsx for CapySocial
 */

import DOMAIN from "../services/endpoint";
import axios from "axios"
import useAuthStore from "../store/AuthStore";
import styles from "./profilepage.module.css"
import { useLoaderData } from "react-router-dom"
import { Link } from "react-router-dom";
import { useEditStore } from "../store/EditStore";
import { getUserIdFromToken } from "../services/jwt.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProfilePage() {

    const { user } = useAuthStore((state) => state);
    const { editMode, toggleEditMode } = useEditStore((state) => state);
    const [ message, setMessage ] = useState("");
    const incomingData = useLoaderData();
    const navigate = useNavigate();

    async function handleEditPassword(e) {
        e.preventDefault()
        const username = user.username
        const password = e.target.password.value;
        console.log()
        const userId = getUserIdFromToken();
        const updatedUser = { username, password, userId };
        const res = await axios.post(`${DOMAIN}/api/users/update/${userId}`, updatedUser);
        toggleEditMode();
        setMessage("Password updated successfully!")
        if (res?.data.success) {
            e.target.title.value = "";
            e.target.content.value = "";
            navigate(`/users/${userId}`);
        }
    }

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Your Profile</h2>
            <p>Username: {user.username}</p>
            {editMode
                ? <form onSubmit={handleEditPassword}>
                    <input type="password" id="password" name="password" placeholder="New Password" required style={{ padding: 10, border: "solid 1px white", backgroundColor: "transparent", color:"white" }} />
                    <button type="submit" className={styles.editBtn} >Change password</button>
                    <button className={styles.editBtn} onClick={toggleEditMode}>Cancel</button>
                </form>
                :
                <button className={styles.editBtn} onClick={toggleEditMode}>Change password</button>}
                {message}
            <h2>Your Posts</h2>
            {incomingData.posts.length === 0 ? <p>You haven't posted anything yet!</p> : incomingData.posts.map((post) => <div key={post.postId} className={styles.thumbnail}>
                <Link to={`/posts/${post.postId.toString()}`} className={styles.navlink}>
                    <p>Posted by @{user.username} on {post.date}</p>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </Link>
            </div>)}
            <h2>Your Comments</h2>
            {incomingData.comments.length === 0 ? <p>You haven't added any comments yet!</p> : incomingData.comments.map((comment) => <div key={comment.commentId} className={styles.thumbnail}>
                <Link to={`/posts/${comment.postId.toString()}`} className={styles.navlink}>
                    <p><strong>{user.username}</strong> {comment.date}</p>
                    <p>{comment.content}</p>
                </Link>
            </div>)}
            <h2>Your Nested Comments</h2>
            {incomingData.nestedComments.length === 0 ? <p>You haven't added any nested comments yet!</p> : incomingData.nestedComments.map((comment) => <div key={comment.nestedcommentId} className={styles.thumbnail}>
                <Link to={`/posts/${comment.postId.toString()}`} className={styles.navlink}>
                    <p><strong>{user.username}</strong> {comment.date}</p>
                    <p>{comment.content}</p>
                </Link>
            </div>)}
        </div>
    )
}

export async function userPostsLoader({ params }) {
    const res = await axios.get(`${DOMAIN}/api/users/${params.userId}`)
    return res.data
}