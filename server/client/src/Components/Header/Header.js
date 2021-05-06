import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Header = (props) => {
    const { userId, isAdmin, setUser } = useContext(UserContext) || {userId: 1, isAdmin: false, setUser: () => {}};
    const [login, setLogin] = useState(!!userId);
    const logOut = () => {
        document.cookie = "id=null; max-age=-1";
        setUser({
            userId: null,
            isAdmin: null
        })
    }

    const onExit = () => {
        logOut();
        setLogin(prevState => !prevState);
    }
    
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Home</Navbar.Brand>
                <Nav className="mr-auto">
                    { isAdmin ?
                        <>
                            <Link to={`/${userId}`} className="nav-link">My profiles</Link>
                            <Link to="/users" className="nav-link">Users</Link>
                        </>
                    : null }
                </Nav>
            { login ? 
                <Link to="/authorisation" className="btn btn-outline-light" onClick={onExit}>Exit</Link>
            : null }
        </Navbar>
    )
}

export default Header;