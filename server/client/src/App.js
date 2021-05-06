import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './Components/Header/Header';
import Content from './Components/Content';
import { UserContext } from './Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const getCookie = (name) => {
    const matches = document.cookie.match(new RegExp(
        // eslint-disable-next-line
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

const src = "http://127.0.0.1:5000";

const App = () => {
  const [user, setUser] = useState({
        userId: getCookie("id"),
        isAdmin: false
    })

  useEffect(() => {
    if (user.userId) {
      fetch(`${src}/api/users/${user.userId}`)
      .then(res => res.json())
      .then(isAdmin => setUser({...user, isAdmin: isAdmin}))
    }
    // eslint-disable-next-line
  }, [])

  const {userId, isAdmin} = user;

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{userId, isAdmin, setUser, src}}>
          <Header />
          <Content />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
