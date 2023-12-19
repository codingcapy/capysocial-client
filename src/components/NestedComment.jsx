
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: nested comment component jsx for CapySocial
 */

import { useState, useEffect } from "react";
import styles from './comment.module.css'
import axios from "axios"
import DOMAIN from "../services/endpoint";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../services/jwt.service";
import { TbArrowBigUp, TbArrowBigDown, TbArrowBigUpFilled, TbArrowBigDownFilled } from 'react-icons/tb'

export default function NestedComment({ cascadedContent, cascadedPostId, cascadedCommentId, cascadedUserId, cascadedUserName, cascadedVotes, cascadedDate, cascadedLastEdit, cascadedNestedCommentId, currentUserId, cascadedNestedCommentVotes, cascadedEdited, cascadedDeleted }) {

    const [commentEditMode, setCommentEditMode] = useState(false)
    const [editedContent, setEditedContent] = useState(cascadedContent);
    const navigate = useNavigate();
    const userId = getUserIdFromToken()
    const [replyMode, setReplyMode] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date());

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setCurrentTime(new Date());
    //     }, 1000);
    //     return () => clearInterval(intervalId);
    // }, []);

    const formattedDate = currentTime.toLocaleString();

    function toggleCommentEditMode() {
        setCommentEditMode(!commentEditMode)
    }

    function toggleReplyMode() {
        setReplyMode(!replyMode)
    }

    async function handleDeleteComment() {
        const content = "[this comment was deleted]"
        const postId = cascadedPostId
        const commentId = cascadedCommentId
        const userId = cascadedUserId
        const date = cascadedDate
        const deleted = true
        const edited = false
        const nestedCommentId = cascadedNestedCommentId
        const updatedComment = { content, postId, commentId, userId, date, edited, deleted, nestedCommentId };
        const res = await axios.post(`${DOMAIN}/api/nested/delete/${nestedCommentId}`, updatedComment)
        if (res?.data.success) {
            navigate(`/capysocial-client/posts/${postId}`)
        }
    }

    async function handleNestedCommentSubmit(e) {
        e.preventDefault()
        const content = `@${cascadedUserName} ${e.target.content.value}`;
        const postId = cascadedPostId;
        const commentId = cascadedCommentId;
        const userId = getUserIdFromToken();
        const date = formattedDate
        const deleted = false
        const edited = false
        const newComment = { content, postId, commentId, userId, date, deleted, edited };
        const res = await axios.post(`${DOMAIN}/api/nested`, newComment);
        toggleReplyMode()
        if (res?.data.success) {
            e.target.content.value = "";
            navigate(`/capysocial-client/posts/${postId}`);
        }
    }

    async function handleEditComment(e) {
        e.preventDefault()
        const content = e.target.content.value;
        const postId = cascadedPostId
        const commentId = cascadedCommentId
        const userId = cascadedUserId
        const date = cascadedDate
        const deleted = false
        const edited = true
        const nestedCommentId = cascadedNestedCommentId
        const updatedComment = { content, postId, commentId, userId, date, deleted, edited, nestedCommentId };
        const res = await axios.post(`${DOMAIN}/api/nested/${nestedCommentId}`, updatedComment)
        toggleCommentEditMode()
        if (res?.data.success) {
            navigate(`/capysocial-client/posts/${postId}`)
        }
    }

    async function clickUpvote() {
        if (!cascadedNestedCommentVotes.find((commentVote) => commentVote.voterId === userId)) {
            const value = 1
            const voterId = userId;
            const commentId = cascadedCommentId
            const nestedCommentId = cascadedNestedCommentId
            const postId = cascadedPostId;
            const vote = { value, postId, commentId, nestedCommentId, voterId, };
            const res = await axios.post(`${DOMAIN}/api/nestedcommentvotes`, vote);
            if (res?.data.success) {
                navigate(`/capysocial-client/posts/${cascadedPostId}`);
            }
        }
        else if (cascadedNestedCommentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].value === 0 || cascadedNestedCommentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].value === -1) {
            const value = 1
            const postId = cascadedPostId;
            const commentId = cascadedCommentId
            const nestedCommentId = cascadedNestedCommentId
            const voterId = userId;
            const nestedCommentVoteId = cascadedNestedCommentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].nestedCommentVoteId;
            const updatedVote = { value, postId, commentId, nestedCommentId, voterId, nestedCommentVoteId }
            const res = await axios.post(`${DOMAIN}/api/nestedcommentvotes/${nestedCommentVoteId}`, updatedVote)
            if (res?.data.success) {
                navigate(`/capysocial-client/posts/${cascadedPostId}`);
            }
        }
    }

    async function neutralVote() {
        const value = 0
        const postId = cascadedPostId;
        const commentId = cascadedCommentId;
        const nestedCommentId = cascadedNestedCommentId
        const voterId = userId;
        const nestedCommentVoteId = cascadedNestedCommentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].nestedCommentVoteId;
        const updatedVote = { value, postId, commentId, nestedCommentId, voterId, nestedCommentVoteId }
        const res = await axios.post(`${DOMAIN}/api/nestedcommentvotes/${nestedCommentVoteId}`, updatedVote)
        if (res?.data.success) {
            navigate(`/capysocial-client/posts/${cascadedPostId}`);
        }
    }

    async function clickDownVote() {
        if (!cascadedNestedCommentVotes.find((commentVote) => commentVote.voterId === userId)) {
            const value = -1
            const voterId = userId;
            const commentId = cascadedCommentId
            const nestedCommentId = cascadedNestedCommentId
            const postId = cascadedPostId;
            const vote = { value, postId, commentId, nestedCommentId, voterId, };
            const res = await axios.post(`${DOMAIN}/api/nestedcommentvotes`, vote);
            if (res?.data.success) {
                navigate(`/capysocial-client/posts/${cascadedPostId}`);
            }
        }
        else if (cascadedNestedCommentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].value === 0 || cascadedNestedCommentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].value === 1) {
            const value = -1
            const postId = cascadedPostId;
            const commentId = cascadedCommentId
            const nestedCommentId = cascadedNestedCommentId
            const voterId = userId;
            const nestedCommentVoteId = cascadedNestedCommentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].nestedCommentVoteId;
            const updatedVote = { value, postId, commentId, nestedCommentId, voterId, nestedCommentVoteId }
            const res = await axios.post(`${DOMAIN}/api/nestedcommentvotes/${nestedCommentVoteId}`, updatedVote)
            if (res?.data.success) {
                navigate(`/capysocial-client/posts/${cascadedPostId}`);
            }
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.comment}><strong>{cascadedUserName}</strong> {cascadedDate} {cascadedEdited && `(edited)`}</p>
            {commentEditMode
                ? <form onSubmit={handleEditComment}>
                    <input type="text" name="content" id="content" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className={styles.textarea} required />
                    <button type="submit" className={styles.submitBtn}>Update</button>
                    <button onClick={toggleCommentEditMode} className={styles.submitBtn}>Cancel</button>
                </form>
                : <div>
                    {cascadedContent}
                    {cascadedDeleted ? "" : cascadedUserId === currentUserId && <button onClick={toggleCommentEditMode} className={styles.replyBtn}>Edit</button>}
                    {cascadedDeleted ? "" : cascadedUserId === currentUserId && <button onClick={handleDeleteComment} className={styles.replyBtn}>Delete</button>}
                </div>}
            <p className={styles.comment}>Upvotes: {cascadedNestedCommentVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}
                {userId !== cascadedUserId
                    ? cascadedNestedCommentVotes.find((commentVote) => commentVote.voterId === userId) !== undefined && cascadedNestedCommentVotes.find((commentVote) => commentVote.voterId === userId).value > 0
                        ? userId && <button onClick={neutralVote} className={styles.replyBtn}><TbArrowBigUpFilled size={20} /></button>
                        : userId && <button onClick={clickUpvote} className={styles.replyBtn}><TbArrowBigUp size={20} /></button>
                    : ""}
                {userId !== cascadedUserId
                    ? cascadedNestedCommentVotes.find((commentVote) => commentVote.voterId === userId) !== undefined && cascadedNestedCommentVotes.find((commentVote) => commentVote.voterId === userId).value < 0
                        ? userId && <button onClick={neutralVote} className={styles.replyBtn}><TbArrowBigDownFilled size={20} /></button>
                        : userId && <button onClick={clickDownVote} className={styles.replyBtn}><TbArrowBigDown size={20} /></button>
                    : ""}
                {userId && <button onClick={toggleReplyMode} className={styles.replyBtn}>Reply</button>}</p>
            {replyMode && <div>
                <form onSubmit={handleNestedCommentSubmit}>
                    <input type="text" name="content" id="content" className={styles.textarea} required />
                    <p><button type="submit" className={styles.commentBtn}>Reply</button>
                        <button className={styles.commentBtn} onClick={toggleReplyMode}>Cancel</button></p>
                </form>
            </div>}
        </div>
    )
}