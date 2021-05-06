import React, { useEffect, useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../Context';

const containsLetters = /^.*[a-zA-Z]+.*$/;
const containsDigit = /(?=.*[0-9])/;
const minimum4Chars = /^.{4,}$/;
const withoutSpasialCharacters = /(?=.*[^A-Za-z0-9])/;

const SignUp = ({ handleChange, makeRequest, redirect }) => {
    const { setUser } = useContext(UserContext);
    const [passwords, setPasswords] = useState({
        password: "",
        repeatPassword: ""
    });

    useEffect(() => {
        if (passwords.password !== passwords.repeatPassword) {
            setEquality(false)
        } else {
            setEquality(true);
        }
    }, [passwords])

    const [passwordsAreEqual, setEquality] = useState(true);
    const [message, setMessage] = useState("Password mast contains at least four characters");

    const signUp = async (e) => {
        e.preventDefault();

        if (!passwordsAreEqual || message.length) {
            return;
        }

        const isUserExist = await makeRequest("sign-up");

        if (!!isUserExist) {
            alert("Email is taken");
        } else {
            let user = await makeRequest("add");
            document.cookie = `id=${user._id}; max-age=2592000`;
            setUser({
                userId: user._id,
                isAdmin: user.isAdmin
            })

            redirect(user._id);
        }
    }

    const validation = (value) => {
        if (!minimum4Chars.test(value)) {
            setMessage("Password must contain at least four characters");
            return;
        }

        if (withoutSpasialCharacters.test(value)) {
            setMessage("Password can not contain special characters");
            return;
        }

        if (!containsDigit.test(value)) {
            setMessage("Password must contain at least one digit");
            return;
        }

        if (!containsLetters.test(value)) {
            setMessage("Password must contain at least one letter");
            return;
        }

        setMessage("");

    }

    const handlePassword = (e, key) => {
        setPasswords({...passwords, [key]: e.target.value})
        handleChange(e)
        
        if (key === "password") validation(e.target.value);
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" name="email" onChange={handleChange}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => handlePassword(e, "password")} isInvalid={message.length}/>
                { message.length ? 
                    <Form.Control.Feedback type="invalid" id="sign-up-password">
                        { message }
                    </Form.Control.Feedback>
                : null }
            </Form.Group>
                
            <Form.Group>
                <Form.Label>Repeat password</Form.Label>
                <Form.Control type="password" placeholder="Repeat password" name="password" onChange={(e) => handlePassword(e, "repeatPassword")} isInvalid={!passwordsAreEqual}/>
                {passwordsAreEqual ? null : 
                    <Form.Control.Feedback type="invalid" id="sign-up-repeat-password">
                        Passwords are not equal
                    </Form.Control.Feedback>
                }
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="I'm admin." name="isAdmin" onChange={handleChange}/>
            </Form.Group>

            <Button variant="primary" type="submit" className="mr-2" onClick={signUp}>Sign up</Button>
        </Form>
    )
}

export default SignUp;