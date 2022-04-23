import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router';
import './style.css';

export default function Signup() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const navigate = useNavigate();


    function validate() {
        if (email.length && password.length && name.length) {
            return true;
        }
        return false;
    }

    function submit(event) {
        event.preventDefault();
        navigate('/');

        const user = {
            name: name,
            email: email,
            password: password,
            Id: Math.random().toString(4).slice(2),
        }

        if (localStorage.getItem('users') !== null) {
            var get = JSON.parse(localStorage.getItem('users'));
            get.push(user);
            localStorage.setItem('users', JSON.stringify(get));
        }
        else {
            localStorage.setItem('users', JSON.stringify([user]));
        }
    }

    return (
        <div className="Center Container">
            <Form onSubmit={submit} className="block-example border border-ligth p-4">
                <h2 className="mb-4 mt-2 text-primary text-center"><strong>SIGNUP</strong></h2>
                <hr />
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label className="mb-3 mt-3"><strong>Name</strong></Form.Label>
                    <Form.Control
                        autoFocus
                        type="name"
                        placeholder="xyz abc"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="mb-3 mt-3"><strong>Email</strong></Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="mb-3 mt-3"><strong>Password</strong></Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <div className="text-center mt-4">Have account? Click here to
                    <NavLink to="/" activeClassName="selected">
                        <span className="text-primary NavLink"> Login</span>
                    </NavLink>
                </div>
                <Button className="mt-4 mb-3" block size="md" type="submit" disabled={!validate()}>
                    Sign Up
                </Button>
            </Form>
        </div>
    );
}
