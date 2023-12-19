
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: home page jsx for CapySocial
 */

import { Link, useLoaderData } from "react-router-dom"
import axios from "axios"
import DOMAIN from "../services/endpoint"
import useSearchStore from '../store/SearchStore';
import styles from "./homepage.module.css"
import { useState, useEffect } from "react";

export default function HomePage() {

    const posts = useLoaderData()
    const { content } = useSearchStore((state) => state)
    const [sortState, setSortState] = useState(posts.map((post) =>
        content !== ""
            ? post._doc.title.toLowerCase().includes(content.toLowerCase()) || post._doc.content.toLowerCase().includes(content.toLowerCase())
                ? <div key={post._doc.postId} className={styles.thumbnail}>
                    <Link to={`/capysocial-client/posts/${post._doc.postId.toString()}`} className={styles.navlink}>
                        <p>Posted by <strong>{post.userName}</strong> on {post._doc.date}</p>
                        <p>upvotes: {post.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                        <h3>{post._doc.title}</h3>
                        <p>{post._doc.content}</p>
                        <p>{post.comments.length + post.nestedComments.length} {post.comments.length + post.nestedComments.length == 1 ? "comment" : "comments"}</p>
                    </Link>
                </div>
                : ""
            : <div key={post._doc.postId} className={styles.thumbnail}>
                <Link to={`/capysocial-client/posts/${post._doc.postId.toString()}`} className={styles.navlink}>
                    <p>Posted by <strong>{post.userName}</strong> on {post._doc.date}</p>
                    <p>upvotes: {post.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                    <h3>{post._doc.title}</h3>
                    <p>{post._doc.content}</p>
                    <p>{post.comments.length + post.nestedComments.length} {post.comments.length + post.nestedComments.length == 1 ? "comment" : "comments"}</p>
                </Link>
            </div>
    ))

    useEffect(() => {
        setSortState(posts.map((post) =>
            content !== ""
                ? post._doc.title.toLowerCase().includes(content.toLowerCase()) || post._doc.content.toLowerCase().includes(content.toLowerCase())
                    ? <div key={post._doc.postId} className={styles.thumbnail}>
                        <Link to={`/capysocial-client/posts/${post._doc.postId.toString()}`} className={styles.navlink}>
                            <p>Posted by <strong>{post.userName}</strong> on {post._doc.date}</p>
                            <p>upvotes: {post.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                            <h3>{post._doc.title}</h3>
                            <p>{post._doc.content}</p>
                            <p>{post.comments.length + post.nestedComments.length} {post.comments.length + post.nestedComments.length == 1 ? "comment" : "comments"}</p>
                        </Link>
                    </div>
                    : ""
                : <div key={post._doc.postId} className={styles.thumbnail}>
                    <Link to={`/capysocial-client/posts/${post._doc.postId.toString()}`} className={styles.navlink}>
                        <p>Posted by <strong>{post.userName}</strong> on {post._doc.date}</p>
                        <p>upvotes: {post.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                        <h3>{post._doc.title}</h3>
                        <p>{post._doc.content}</p>
                        <p>{post.comments.length + post.nestedComments.length} {post.comments.length + post.nestedComments.length == 1 ? "comment" : "comments"}</p>
                    </Link>
                </div>
        ))
    }, [content])

    function sortByOldest() {
        posts.sort((a, b) => {
            const dateA = new Date(a._doc.date).getTime()
            const dateB = new Date(b._doc.date).getTime()
            return dateA - dateB
        })
        setSortState(
            posts.map((post) =>
                content !== ""
                    ? post._doc.title.toLowerCase().includes(content.toLowerCase()) || post._doc.content.toLowerCase().includes(content.toLowerCase())
                        ? <div key={post._doc.postId} className={styles.thumbnail}>
                            <Link to={`/capysocial-client/posts/${post._doc.postId.toString()}`} className={styles.navlink}>
                                <p>Posted by <strong>{post.userName}</strong> on {post._doc.date}</p>
                                <p>upvotes: {post.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                                <h3>{post._doc.title}</h3>
                                <p>{post._doc.content}</p>
                                <p>{post.comments.length + post.nestedComments.length} {post.comments.length + post.nestedComments.length == 1 ? "comment" : "comments"}</p>
                            </Link>
                        </div>
                        : ""
                    : <div key={post._doc.postId} className={styles.thumbnail}>
                        <Link to={`/capysocial-client/posts/${post._doc.postId.toString()}`} className={styles.navlink}>
                            <p>Posted by <strong>{post.userName}</strong> on {post._doc.date}</p>
                            <p>upvotes: {post.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                            <h3>{post._doc.title}</h3>
                            <p>{post._doc.content}</p>
                            <p>{post.comments.length + post.nestedComments.length} {post.comments.length + post.nestedComments.length == 1 ? "comment" : "comments"}</p>
                        </Link>
                    </div>
            )
        )
    }

    function sortByLatest() {
        posts.sort((a, b) => {
            const dateA = new Date(a._doc.date).getTime()
            const dateB = new Date(b._doc.date).getTime()
            return dateB - dateA
        })
        setSortState(
            posts.map((post) =>
                content !== ""
                    ? post._doc.title.toLowerCase().includes(content.toLowerCase()) || post._doc.content.toLowerCase().includes(content.toLowerCase())
                        ? <div key={post._doc.postId} className={styles.thumbnail}>
                            <Link to={`/capysocial-client/posts/${post._doc.postId.toString()}`} className={styles.navlink}>
                                <p>Posted by <strong>{post.userName}</strong> on {post._doc.date}</p>
                                <p>upvotes: {post.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                                <h3>{post._doc.title}</h3>
                                <p>{post._doc.content}</p>
                                <p>{post.comments.length + post.nestedComments.length} {post.comments.length + post.nestedComments.length == 1 ? "comment" : "comments"}</p>
                            </Link>
                        </div>
                        : ""
                    : <div key={post._doc.postId} className={styles.thumbnail}>
                        <Link to={`/capysocial-client/posts/${post._doc.postId.toString()}`} className={styles.navlink}>
                            <p>Posted by <strong>{post.userName}</strong> on {post._doc.date}</p>
                            <p>upvotes: {post.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                            <h3>{post._doc.title}</h3>
                            <p>{post._doc.content}</p>
                            <p>{post.comments.length + post.nestedComments.length} {post.comments.length + post.nestedComments.length == 1 ? "comment" : "comments"}</p>
                        </Link>
                    </div>
            )
        )
    }

    function sortByMostPopular() {
        posts.sort((a, b) => {
            const voteA = a.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
            const voteB = b.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
            return voteB - voteA
        })
        setSortState(
            posts.map((post) =>
                content !== ""
                    ? post._doc.title.toLowerCase().includes(content.toLowerCase()) || post._doc.content.toLowerCase().includes(content.toLowerCase())
                        ? <div key={post._doc.postId} className={styles.thumbnail}>
                            <Link to={`/capysocial-client/posts/${post._doc.postId.toString()}`} className={styles.navlink}>
                                <p>Posted by <strong>{post.userName}</strong> on {post._doc.date}</p>
                                <p>upvotes: {post.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                                <h3>{post._doc.title}</h3>
                                <p>{post._doc.content}</p>
                                <p>{post.comments.length + post.nestedComments.length} {post.comments.length + post.nestedComments.length == 1 ? "comment" : "comments"}</p>
                            </Link>
                        </div>
                        : ""
                    : <div key={post._doc.postId} className={styles.thumbnail}>
                        <Link to={`/capysocial-client/capysocial-client/posts/${post._doc.postId.toString()}`} className={styles.navlink}>
                            <p>Posted by <strong>{post.userName}</strong> on {post._doc.date}</p>
                            <p>upvotes: {post.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                            <h3>{post._doc.title}</h3>
                            <p>{post._doc.content}</p>
                            <p>{post.comments.length + post.nestedComments.length} {post.comments.length + post.nestedComments.length == 1 ? "comment" : "comments"}</p>
                        </Link>
                    </div>
            )
        )
    }

    return (
        <div className={styles.homePage}>
            <h2>CapySocial Home</h2>
            <p className="py-3">Sort By: <button className={styles.sortBtn} onClick={sortByOldest}>Oldest</button><button onClick={sortByLatest} className={styles.sortBtn}>Latest</button><button onClick={sortByMostPopular} className={styles.sortBtn}>Most Popular</button></p>
            <div className={styles.thumbnails}>
                {sortState}
            </div>
        </div>
    )
}

export async function pageLoader() {
    const res = await axios.get(`${DOMAIN}/api/posts`)
    return res.data
}