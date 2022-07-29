import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import './style.css';

export default function EditComment() {
    const loc = useLocation();
    let comment = loc.state.comment;
    let [comments] = useState(loc.state.comments);
    let pid = loc.state.pid;
    let userId = loc.state.userId;

    const id = useParams();
    console.log(id);
    const navigate = useNavigate();

    let [content, setContent] = useState(comment.body);

    function validate() {
        if (content.length) {
            return true;
        }
        return false;
    }

    function submit(event) {
        event.preventDefault();
        let index = comments.findIndex((data) => data.id === comment.id);
        if (index !== -1) {
            comments[index].body = content;
        }
        localStorage.setItem('comments' + pid, JSON.stringify(comments));

        navigate('/Post/' + pid, { state: { pid: pid, uid: userId } });
    }

    return (
        <div className="">
            <Form onSubmit={submit} className="block-example border border-light bg-grey-color p-4 m-5">
                <h2 className="mb-4 mt-2 text-primary text-center"><strong>Edit Comment</strong></h2>
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
