import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router';
import userContext from "./userContext";
import './style.css';


export default function Login() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [userId] = useState("");
    const context = useContext(userContext);
    let [users, addUser] = useState(JSON.parse(localStorage.getItem('users')));

    const navigate = useNavigate();

    function validate() {
        let valid = false;
        if (email.length && password.length) {
            valid = true;
        }
        return valid;
    }

    function submit(event) {
        event.preventDefault();
        let userFound = false;
        if (email.length && password.length) {
            users.forEach(user => {
                if (!userFound && user.email === email && user.password === password) {
                    userFound = true;
                    context.setUser(user);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            })
        }

        if (userFound === false) {
            alert("Invalid Email Password");
        }
        else
            navigate('/main', { state: { userId } });
    }

    return (
        <div className="Center">
            <Form onSubmit={submit} className="block-example border border-ligth p-4">
                <h2 className="mb-4 mt-2 text-primary text-center"><strong>LOGIN</strong></h2>
                <hr />
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="left-margin mb-3 mt-2"><strong>Email</strong></Form.Label>
                    <Form.Control
                        autoFocus
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
                <div className="text-center mt-4">No account? Click here to
                    <NavLink to={{ pathname: "/Signup", addUser: { addUser } }}>
                        <span className="text-primary NavLink"> SignUp</span>
                    </NavLink>
                </div>
                <Button className="mt-4 mb-3" block size="md" type="submit" disabled={!validate()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}
