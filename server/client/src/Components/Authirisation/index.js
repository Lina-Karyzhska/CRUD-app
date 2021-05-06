import React, { useContext, useEffect } from 'react';
import { withRouter } from "react-router";
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Login from './LogIn';
import SignUp from './SignUp';
import { UserContext } from '../../Context';

const Authorisation = (props) => {
    const user = {
        email: "",
        password: "",
        isAdmin: false
    };

    const { userId, src } = useContext(UserContext);

    useEffect(() => {
        if (userId) props.history.push(`/${userId}`);
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        let res;
        if (e.target.type === "checkbox") {
            res = e.target.checked
        } else {
            res = e.target.value;
        }

        user[e.target.name] = res;
    }

    const makeRequest = (path) => {
        return fetch(`${src}/api/users/${path}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...user})
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))
    }

    const redirect = (id) => {
        props.history.push(`/${id}`);
    }

    return (
        <Container className="w-50">
            <Tabs id="tab" defaultActiveKey="login">
                <Tab id="login" eventKey="login" title="Log in">
                    <Login handleChange={handleChange} makeRequest={makeRequest} redirect={redirect}/>
                </Tab>

                <Tab id="signup" eventKey="signup" title="Sign up">
                    <SignUp handleChange={handleChange} makeRequest={makeRequest} redirect={redirect}/>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default withRouter(Authorisation);