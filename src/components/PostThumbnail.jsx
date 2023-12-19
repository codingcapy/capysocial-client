
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: post thumbnail component jsx for CapySocial
 */

import { Link } from "react-router-dom"
import styles from "./postthumbnail.module.css"

export default function PostThumbnail({ title, content, userName, date, postId, comments, nestedComments, postVotes }) {
    return (
        <div className={styles.thumbnail}>
            <Link to={postId.toString()} className={styles.navlink}>
                <p>Posted by <strong>{userName}</strong> on {date}</p>
                <p>upvotes: {postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                <h3>{title}</h3>
                <p>{content}</p>
                <p>{comments.length + nestedComments.length} {comments.length + nestedComments.length == 1 ? "comment" : "comments"}</p>
            </Link>
        </div>
    )
}