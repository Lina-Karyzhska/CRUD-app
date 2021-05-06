import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../Context';

const LogIn = ({ handleChange, makeRequest, redirect }) => {
    const { setUser } = useContext(UserContext);

    const logIn = async (e) => {
        e.preventDefault();
        const user = await makeRequest("log-in");

        if (!!user) {
            document.cookie = `id=${user._id}; max-age=2592000`;
            setUser({
                userId: user._id,
                isAdmin: user.isAdmin
            })

            redirect(user._id);
        } else {
            alert("User dose not exist");
        }
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" name="email" onChange={handleChange}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
            </Form.Group>

            <Button variant="primary" type="submit" className="mr-2" onClick={logIn}>Log in</Button>
        </Form>
    )
}

export default LogIn;