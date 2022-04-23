import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './style.css';

export default function Makepost({ posts, setPosts }) {
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");
    const user = JSON.parse(localStorage.getItem('currentUser'));
    let pid = posts.length + 1;

    function validate() {
        if (title.length && content.length) {
            return true;
        }
        return false;
    }

    function submit(event) {
        event.preventDefault();
        let post = { title: title, body: content, id: pid, userId: user.Id };
        
        const updatedPosts = [...posts]; 
        updatedPosts.push(post);
        setPosts(updatedPosts);

        localStorage.setItem('posts', JSON.stringify(updatedPosts));

        setTitle("");
        setContent("");
        console.log(posts);
        //window.location.reload();
    }

    return (
        <div className="">
            <Form onSubmit={submit} className="block-example border border-light bg-grey-color p-4 m-5">
                <h2 className="mb-4 mt-2 text-primary text-center"><strong>Create New Post</strong></h2>
                <hr />
                <Form.Group className="mb-3" controlId="Title">
                    <Form.Label className="left-margin mb-3 mt-2"><strong>Title</strong></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="content">
                    <Form.Label className="mb-3 mt-3 row-3"><strong>Content</strong></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="abc..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>
                <div className="text-end">
                    <Button className="mt-4 mb-2" block size="md" type="submit" disabled={validate}>
                        Create
                    </Button>
                </div>
            </Form>
        </div>
    );
}
