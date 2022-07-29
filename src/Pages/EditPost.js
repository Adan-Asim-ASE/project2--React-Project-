import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import './style.css';

export default function EditPost() {
    const loc = useLocation();
    let post = loc.state.post;
    let posts = loc.state.posts;

    const id = useParams();
    console.log(id);
    const navigate = useNavigate();

    let [title, setTitle] = useState(post.title);
    let [content, setContent] = useState(post.body);

    function validate() {
        if (title.length > 0 && content.length > 0) {
            return true;
        }
        return false;
    }

    function submit(event) {
        event.preventDefault();
        let index = posts.findIndex((data) => data.id === post.id);

        posts[index].title = title;
        posts[index].body = content;

        localStorage.removeItem('posts');
        localStorage.setItem('posts', JSON.stringify(posts));
        navigate('/Home', { state: { userId: post.userId } });
    }

    return (
        <div className="">
            <Form onSubmit={submit} className="block-example border border-light bg-grey-color p-4 m-5">
                <h2 className="mb-4 mt-2 text-primary text-center"><strong>Edit Post</strong></h2>
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
                        Update
                    </Button>
                </div>
            </Form>
        </div>
    );
}
