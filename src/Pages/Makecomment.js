import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './style.css';

export default function Makecomment({ comments, setComment, userId, postId }) {
    let [content, setContent] = useState("");
    let [user] = useState(JSON.parse(localStorage.getItem('currentUser')));
    let cid = 1;

    if (comments?.length !== undefined && comments?.length !== null) {
        cid = comments.length + 1;
    }

    function validate() {
        if (content.length) {
            return true;
        }
        return false;
    }

    function submit(event) {
        event.preventDefault();
        let comment = { postId, body: content, id: cid, name: user.name, email: user.email, userId };

        let updatedComments;
        if (comments === null)
            updatedComments = new Array(comment);
        else {
            updatedComments = [...comments];

            updatedComments.push(comment);
        }

        setComment(updatedComments);

        localStorage.setItem('comments' + postId, JSON.stringify(updatedComments));

        setContent("");
        window.location.reload();
    }

    return (
        <div className="">
            <Form onSubmit={submit} className="block-example border border-light bg-grey-color p-4 m-5">
                <h2 className="mb-4 mt-2 text-primary text-center"><strong>Create Comment</strong></h2>
                <hr />
                <Form.Group className="mb-3" controlId="content">
                    <Form.Label className="mb-3 mt-3 row-3"><strong>Body</strong></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="abc..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>
                <div className="text-end">
                    <Button className="mt-4 mb-2" block size="md" type="submit" disabled={validate}>
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
}
