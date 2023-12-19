
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: comment component jsx for CapySocial
 */

import { useState, useEffect } from "react";
import styles from './comment.module.css'
import axios from "axios"
import DOMAIN from "../services/endpoint";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../services/jwt.service";
import NestedComment from "./NestedComment";
import { TbArrowBigUp, TbArrowBigDown, TbArrowBigUpFilled, TbArrowBigDownFilled } from 'react-icons/tb'

export default function Comment({ parentContent, parentPostId, parentUserId, userName, parentVotes, parentDate, parentCommentId, currentUserId, nestedComments, commentVotes, nestedCommentVotes, parentEdited, parentDeleted }) {

    const [commentEditMode, setCommentEditMode] = useState(false)
    const [editedContent, setEditedContent] = useState(parentContent);
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

    async function handleNestedCommentSubmit(e) {
        e.preventDefault()
        const content = e.target.content.value;
        const postId = parentPostId;
        const commentId = parentCommentId;
        const userId = getUserIdFromToken();
        const date = formattedDate
        const deleted = false
        const edited = false
        const newComment = { content, postId, commentId, userId, date, deleted, edited };
        const res = await axios.post(`${DOMAIN}/api/nested`, newComment);
        toggleReplyMode()
        if (res?.data.success) {
            e.target.content.value = "";
            navigate(`/capysocial-client/posts/${parentPostId}`);
        }
    }

    async function handleDeleteComment() {
        const content = "[This comment was deleted]"
        const postId = parentPostId
        const userId = parentUserId
        const votes = parentVotes
        const date = parentDate
        const lastEdit = formattedDate
        const commentId = parentCommentId
        const edited = false;
        const deleted = true;
        const updatedComment = { content, postId, userId, votes, date, lastEdit, commentId, edited, deleted };
        const res = await axios.post(`${DOMAIN}/api/comments/delete/${commentId}`, updatedComment)
        if (res?.data.success) {
            navigate(`/capysocial-client/posts/${postId}`)
        }
    }

    async function handleEditComment(e) {
        e.preventDefault()
        const content = e.target.content.value;
        const postId = parentPostId
        const userId = parentUserId
        const date = parentDate
        const lastEdit = formattedDate
        const commentId = parentCommentId
        const edited = true;
        const deleted = false;
        const updatedComment = { content, postId, userId, date, lastEdit, commentId, edited, deleted };
        const res = await axios.post(`${DOMAIN}/api/comments/${commentId}`, updatedComment)
        toggleCommentEditMode()
        if (res?.data.success) {
            navigate(`/capysocial-client/posts/${postId}`)
        }
    }

    async function clickUpvote() {
        if (!commentVotes.find((commentVote) => commentVote.voterId === userId)) {
            const value = 1
            const voterId = userId;
            const commentId = parentCommentId
            const postId = parentPostId;
            const vote = { value, postId, commentId, voterId, };
            const res = await axios.post(`${DOMAIN}/api/commentvotes`, vote);
            if (res?.data.success) {
                navigate(`/capysocial-client/posts/${parentPostId}`);
            }
        }
        else if (commentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].value === 0 || commentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].value === -1) {
            const value = 1
            const voterId = userId;
            const commentId = parentCommentId
            const postId = parentPostId;
            const commentVoteId = commentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].commentVoteId;
            const updatedVote = { value, postId, commentId, voterId, commentVoteId }
            const res = await axios.post(`${DOMAIN}/api/commentvotes/${commentVoteId}`, updatedVote)
            if (res?.data.success) {
                navigate(`/capysocial-client/posts/${parentPostId}`);
            }
        }
    }

    async function neutralVote() {
        const value = 0
        const voterId = userId;
        const postId = parentPostId;
        const commentId = parentCommentId;
        const commentVoteId = commentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].commentVoteId;
        const updatedVote = { value, postId, commentId, voterId, commentVoteId }
        const res = await axios.post(`${DOMAIN}/api/commentvotes/${commentVoteId}`, updatedVote)
        if (res?.data.success) {
            navigate(`/capysocial-client/posts/${parentPostId}`);
        }
    }

    async function clickDownVote() {
        if (!commentVotes.find((commentVote) => commentVote.voterId === userId)) {
            const value = -1
            const voterId = userId;
            const commentId = parentCommentId
            const postId = parentPostId;
            const vote = { value, postId, commentId, voterId, };
            const res = await axios.post(`${DOMAIN}/api/commentvotes`, vote);
            if (res?.data.success) {
                navigate(`/capysocial-client/posts/${parentPostId}`);
            }
        }
        else if (commentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].value === 0 || commentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].value === 1) {
            const value = -1
            const voterId = userId;
            const commentId = parentCommentId
            const postId = parentPostId;
            const commentVoteId = commentVotes.filter((commentVote) => commentVote.voterId === parseInt(userId))[0].commentVoteId;
            const updatedVote = { value, postId, commentId, voterId, commentVoteId }
            const res = await axios.post(`${DOMAIN}/api/commentvotes/${commentVoteId}`, updatedVote)
            if (res?.data.success) {
                navigate(`/capysocial-client/posts/${parentPostId}`);
            }
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.comment}><strong>{userName}</strong> {parentDate} {parentEdited && `(edited)`}</p>
            {commentEditMode
                ? <form onSubmit={handleEditComment}>
                    <input type="text" name="content" id="content" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className={styles.textarea} required />
                    <p><button type="submit" className={styles.submitBtn}>Update</button>
                        <button onClick={toggleCommentEditMode} className={styles.submitBtn}>Cancel</button></p>
                </form>
                : <div>
                    {parentContent}
                    {parentDeleted ? "" : parentUserId === currentUserId && <button onClick={toggleCommentEditMode} className={styles.replyBtn}>Edit</button>}
                    {parentDeleted ? "" : parentUserId === currentUserId && <button onClick={handleDeleteComment} className={styles.replyBtn}>Delete</button>}
                </div>}
            <p className={styles.comment}>Upvotes: {commentVotes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)}
                {userId !== parentUserId
                    ? commentVotes.find((commentVote) => commentVote.voterId === userId) !== undefined && commentVotes.find((commentVote) => commentVote.voterId === userId).value > 0
                        ? userId && <button onClick={neutralVote} className={styles.replyBtn}><TbArrowBigUpFilled size={20} /></button>
                        : userId && <button onClick={clickUpvote} className={styles.replyBtn}><TbArrowBigUp size={20} /></button>
                    : ""}
                {userId !== parentUserId
                    ? commentVotes.find((commentVote) => commentVote.voterId === userId) !== undefined && commentVotes.find((commentVote) => commentVote.voterId === userId).value < 0
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
            <div className={styles.nestedContainer}>
                {nestedComments.filter((nestedComment) => nestedComment._doc.commentId === parentCommentId).map((filtered) => (
                    <NestedComment key={filtered._doc.nestedCommentId} cascadedContent={filtered._doc.content} cascadedPostId={filtered._doc.postId} cascadedCommentId={filtered._doc.commentId} cascadedUserId={filtered._doc.userId} cascadedUserName={filtered.userName} cascadedVotes={filtered.votes} cascadedDate={filtered._doc.date} cascadedLastEdit={filtered.lastEdit} cascadedNestedCommentId={filtered._doc.nestedCommentId} currentUserId={currentUserId} cascadedNestedCommentVotes={nestedCommentVotes.filter((nestedCommentVote) => nestedCommentVote.nestedCommentId === filtered._doc.nestedCommentId)} cascadedEdited={filtered._doc.edited} cascadedDeleted={filtered._doc.deleted} />
                ))}
            </div>
        </div>
    )
}