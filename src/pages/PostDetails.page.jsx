
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: post details page jsx for CapySocial
 */

import React, { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import { getUserIdFromToken } from '../services/jwt.service';
import axios from "axios";
import DOMAIN from "../services/endpoint";
import styles from "./postdetailspage.module.css";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { useEditStore } from "../store/EditStore";
import Comment from '../components/Comment';
import { TbArrowBigUp, TbArrowBigDown, TbArrowBigUpFilled, TbArrowBigDownFilled } from 'react-icons/tb'

export default function PostDetailsPage() {

    const post = useLoaderData();
    const { user } = useAuthStore((state) => state);
    const userId = getUserIdFromToken();
    const { editMode, toggleEditMode } = useEditStore((state) => state);
    const navigate = useNavigate();
    const [editedTitle, setEditedTitle] = useState(post.post._doc.title);
    const [editedContent, setEditedContent] = useState(post.post._doc.content);
    const [currentTime, setCurrentTime] = useState(new Date());

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setCurrentTime(new Date());
    //     }, 1000);
    //     return () => clearInterval(intervalId);
    // }, []);

    const formattedDate = currentTime.toLocaleString();

    async function handleCommentSubmit(e) {
        e.preventDefault()
        const content = e.target.content.value;
        const postId = post.post._doc.postId;
        const userId = getUserIdFromToken();
        const date = formattedDate
        const edited = false;
        const deleted = false;
        const newComment = { content, postId, userId, date, edited, deleted };
        const res = await axios.post(`${DOMAIN}/api/comments`, newComment);
        if (res?.data.success) {
            e.target.content.value = "";
            navigate(`/capysocial-client/posts/${post.post._doc.postId}`);
        }
    }

    async function handleEditPost(e) {
        e.preventDefault()
        const title = e.target.title.value;
        const content = e.target.content.value;
        const userId = getUserIdFromToken();
        const date = post.post._doc.date;
        const postId = post.post._doc.postId;
        const edited = true;
        const deleted = false;
        const updatedPost = { title, content, userId, date, postId, edited, deleted };
        const res = await axios.post(`${DOMAIN}/api/posts/${post.post._doc.postId}`, updatedPost);
        toggleEditMode();
        if (res?.data.success) {
            e.target.title.value = "";
            e.target.content.value = "";
            navigate(`/capysocial-client/posts/${post.post._doc.postId}`);
        }
    }

    async function handleDeletePost() {
        const title = post.post._doc.title;
        const content = "[This post was deleted]";
        const userId = getUserIdFromToken();
        const date = post.post._doc.date;
        const postId = post.post._doc.postId;
        const edited = false;
        const deleted = true;
        const updatedPost = { title, content, userId, date, edited, deleted, postId };
        const res = await axios.post(`${DOMAIN}/api/posts/delete/${post.post._doc.postId}`, updatedPost);
        if (res?.data.success) {
            navigate(`/capysocial-client/posts/${post.post._doc.postId}`);
        }
    }

    async function clickUpvote() {
        if (!post.postVotes.find((postVote) => postVote.voterId === userId)) {
            const value = 1
            const voterId = userId;
            const postId = post.post._doc.postId;
            const vote = { value, postId, voterId };
            const res = await axios.post(`${DOMAIN}/api/votes`, vote);
            if (res?.data.success) {
                navigate(`/capysocial-client/posts/${post.post._doc.postId}`);
            }
        }
        else if (post.postVotes.filter((postVote) => postVote.voterId === parseInt(userId))[0].value === 0 || post.postVotes.filter((postVote) => postVote.voterId === parseInt(userId))[0].value === -1) {
            const value = 1
            const voterId = userId;
            const postId = post.postId;
            const postVoteId = post.postVotes.filter((postVote) => postVote.voterId === parseInt(userId))[0].postVoteId;
            const updatedVote = { value, postId, voterId, postVoteId }
            const res = await axios.post(`${DOMAIN}/api/votes/${postVoteId}`, updatedVote)
            if (res?.data.success) {
                navigate(`/capysocial-client/posts/${post.post._doc.postId}`);
            }
        }
    }

    async function neutralVote() {
        const value = 0
        const voterId = userId;
        const postId = post.postId;
        const postVoteId = post.postVotes.filter((postVote) => postVote.voterId === parseInt(userId))[0].postVoteId;
        const updatedVote = { value, postId, voterId, postVoteId }
        const res = await axios.post(`${DOMAIN}/api/votes/${postVoteId}`, updatedVote)
        if (res?.data.success) {
            navigate(`/capysocial-client/posts/${post.post._doc.postId}`);
        }
    }

    async function clickDownVote() {
        if (!post.postVotes.find((postVote) => postVote.voterId === userId)) {
            const value = -1
            const voterId = userId;
            const postId = post.post._doc.postId;
            const vote = { value, postId, voterId };
            const res = await axios.post(`${DOMAIN}/api/votes`, vote);
            if (res?.data.success) {
                navigate(`/capysocial-client/posts/${post.post._doc.postId}`);
            }
        }
        else if (post.postVotes.filter((postVote) => postVote.voterId === parseInt(userId))[0].value === 0 || post.postVotes.filter((postVote) => postVote.voterId === parseInt(userId))[0].value === 1) {
            const value = -1
            const voterId = userId;
            const postId = post.postId;
            const postVoteId = post.postVotes.filter((postVote) => postVote.voterId === parseInt(userId))[0].postVoteId;
            const updatedVote = { value, postId, voterId, postVoteId }
            const res = await axios.post(`${DOMAIN}/api/votes/${postVoteId}`, updatedVote)
            if (res?.data.success) {
                navigate(`/capysocial-client/posts/${post.post._doc.postId}`);
            }
        }
    }

    return (
        <div className={styles.page}>
            {editMode
                ? <div>
                    <form onSubmit={handleEditPost}>
                        <h2>Edit Post</h2>
                        <div className={styles.input}>
                            <label htmlFor="title">Title</label>
                            <input type="text" name='title' id='title' placeholder="Title" value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)} required className={styles.textarea} />
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="content">Content</label>
                            <textarea type="text" name='content' id='content' placeholder='Content' value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)} required rows="25" cols="50" className={styles.textarea} />
                        </div>
                        <button type="submit" className={styles.submitBtn}>Update</button>
                    </form>
                    <button onClick={toggleEditMode} className={styles.commentBtn}>Cancel</button>
                </div>
                : <div>
                    <p>Posted by <strong>{post.post.userName}</strong> on {post.post._doc.date} {post.post._doc.edited && "(edited)"}</p>
                    <h2 className={styles.title}>{post.post._doc.title}</h2>
                    <div>
                        {userId !== post.post._doc.userId
                            ? post.postVotes.find((postVote) => postVote.voterId === userId) !== undefined && post.postVotes.find((postVote) => postVote.voterId === userId).value > 0
                                ? user && <div onClick={neutralVote} className={styles.voteBtn}><TbArrowBigUpFilled size={25} /></div>
                                : user && <div onClick={clickUpvote} className={styles.voteBtn}><TbArrowBigUp size={25} /></div>
                            : ""}
                        <p>Upvotes: {post.postVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}</p>
                        {userId !== post.post._doc.userId
                            ? post.postVotes.find((postVote) => postVote.voterId === userId) !== undefined && post.postVotes.find((postVote) => postVote.voterId === userId).value < 0
                                ? user && <div onClick={neutralVote} className={styles.voteBtn}><TbArrowBigDownFilled size={25} /></div>
                                : user && <div onClick={clickDownVote} className={styles.voteBtn}><TbArrowBigDown size={25} /></div>
                            : ""}
                    </div>
                    <p>{post.post._doc.content}</p>
                    {post.post._doc.deleted ? "" : userId === post.post._doc.userId && <button onClick={toggleEditMode} className={styles.editBtn}>Edit</button>}
                    {post.post._doc.deleted ? "" : userId === post.post._doc.userId && <button onClick={handleDeletePost} className={styles.editBtn}>Delete</button>}
                </div>}
            <h3>Comments</h3>
            {!user && <p>Please log in to add comments!</p>}
            {user && <form onSubmit={handleCommentSubmit}>
                <label htmlFor="content">Add comment</label>
                <div className={styles.input}>
                    <textarea type="text" name="content" id="content" placeholder="What are your thoughts?" required rows="5" cols="15" className={styles.textarea} />
                    <button type="submit" className={styles.commentBtn}>Comment</button>
                </div>
            </form>}
            <hr />
            <div className={styles.commentContainer}>
                {post.comments.map((comment) =>
                    <Comment key={comment._doc.commentId} parentContent={comment._doc.content} parentPostId={comment._doc.postId} parentUserId={comment._doc.userId} userName={comment.userName} parentVotes={comment._doc.votes} parentDate={comment._doc.date} parentLastEdit={comment._doc.lastEdit} parentCommentId={comment._doc.commentId} currentUserId={userId} nestedComments={post.nestedComments} commentVotes={post.commentVotes.filter((commentVote) => commentVote.commentId === comment._doc.commentId)} nestedCommentVotes={post.nestedCommentVotes.filter((nestedCommentVote) => nestedCommentVote.commentId === comment._doc.commentId)} parentEdited={comment._doc.edited} parentDeleted={comment._doc.deleted} />
                )}
            </div>
        </div>
    )
}

export async function postDetailsLoader({ params }) {
    const res = await axios.get(`${DOMAIN}/api/posts/${params.postId}`)
    return res.data
}