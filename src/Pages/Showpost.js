import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import Makecomment from './Makecomment';
import './style.css';

export default function Showpost() {
    const loc = useLocation();
    const pid = loc.state.pid;
    const [uid] = useState(JSON.parse(localStorage.getItem('currentUser')).Id);

    const [post] = useState(JSON.parse(localStorage.getItem('posts')).find(p => (p.id === pid)));
    const [comments, setComment] = useState(loadComments());

    function loadComments() {
        let loadedComments = JSON.parse(localStorage.getItem('comments' + pid));

        if (loadedComments == null || loadedComments === undefined) {
            fetch(process.env.REACT_APP_POSTS_API + pid + "/comments")
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        loadedComments = data;
                        localStorage.setItem('comments' + pid, JSON.stringify(loadedComments));
                        window.location.reload();
                    }
                });
        }
        return loadedComments;
    }

    function removeComment(cid) {
        const updatedComments = comments.filter(c => (c.id !== cid));
        setComment(updatedComments);
        localStorage.setItem('comments' + pid, JSON.stringify(updatedComments));
    }

    return (
        <div className="Showpost">
            <Link to='/main' state={{ userId: uid }} className="btn btn-outline-primary m-4"> Back</Link>
            {
                post === undefined ? null :
                    <div className="m-5">
                        <div to className="block-example border border-ligth p-4 mt-5 ms-5 me-5">
                            <h2 className="text-center text-primary mb-4">{post.title}</h2>
                            <p className="lead text-dark text-center">{post.body}</p>
                            <p className="text-end mt-5 me-4 text-black-50"><i>(This post#{post.id} was made by user# {post.userId})</i></p>
                        </div>
                        <Makecomment comments={comments} setComment={setComment} userId={uid} postId={pid} />
                        {
                            comments?.map(comment =>
                                <div to className="block-example border border-ligth p-4 ms-5 me-5">
                                    <h6 className="text-left text-dark mt-4"> <span className="text-primary"> Made By: </span> {comment.name} - {comment.email}  </h6>
                                    <p className="text-dark text-left ms-0">{comment.body}</p>
                                    {
                                        comment.userId !== uid ? null :
                                            (
                                                <div className="text-end mt-2">
                                                    <Link to={'/Editcomment'} state={{ comment: comment, comments: comments, pid: post.id, userId: post.userId }} className="btn btn-outline-primary btn-md me-3">Modify</Link>
                                                    <button onClick={() => removeComment(comment.id)} className="btn btn-outline-primary btn-md me-2">Delete </button>
                                                </div>
                                            )
                                    }
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    );
}
