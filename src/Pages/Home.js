import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Makepost from "./MakePost";
import './style.css';


export default function Main() {
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const uid = user.Id;

    useEffect(() => {
        const posts = localStorage.getItem('posts');
        if (posts == null || posts === undefined) {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then(response => response.json())
                .then(data => {
                    setPosts(data)
                    console.log(data)
                    localStorage.setItem('posts', JSON.stringify(data));
                });
        }
        else {
            setPosts(JSON.parse(posts));
        }
    }, []);

    function removePost(pid) {
        const updatedPosts = posts.filter(p => (p.id !== pid));
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        localStorage.removeItem('comments' + pid);
    }

    return (
        <div className="Main m-5">
            <div className="">
                <div className="text-white m-5 block-example border border-light bg-primary p-2 m-5">
                    <h1 className="text-center mt-5"><strong> ALL POSTS </strong></h1>
                    <div className="text-end mb-1 me-4">
                        <Button className="btn btn-outline-light btn-md me-3">Create Post</Button>
                    </div>
                </div>
                <Makepost controlID="make" posts={posts} setPosts={setPosts} userId={uid} />
                {
                    posts?.map(post =>
                        <div to className="block-example border border-ligth p-4 m-5">
                            <h2 className="text-center text-primary mb-4">{post.title}</h2>
                            <p className="lead text-dark text-center">{post.body}</p>
                            <p className="text-end mt-55522255 me-4 text-black-50"><i>(This post#{post.id} was made by user# {post.userId})</i></p>
                            <Link to={'/Post/' + post.id} state={{ pid: post.id, uid: uid }} className="no-decor"> Show Comments...</Link>
                            {
                                post.userId !== uid ? null :
                                    <div className="text-end mt-2">
                                        <Link to={'/Post/' + post.id + '/edit'} state={{ post: post, posts: posts }} className="btn btn-outline-primary btn-md me-3">Modify</Link>
                                        <button onClick={() => removePost(post.id)} className="btn btn-outline-primary btn-md me-2">Delete </button>
                                    </div>
                            }
                        </div>)
                }
            </div>
        </div>
    );
}


