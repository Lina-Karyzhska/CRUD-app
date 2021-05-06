import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context';
import UsersList from './UsersList';

const Users = () => {
    const { userId, src } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    // const [profiles, setProfiles] = useState([]);

    const getUsers = () => {
        fetch(`${src}/api/users/`)
        .then(res => res.json())
        .then(users => {
            const result = users.filter(user => user._id !== userId)
            setUsers([...result])
        })
    }

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, [])

    const changeUser = (id, password, isAdmin) => {
        let newIsAdmin = isAdmin;
        if (isAdmin === undefined) newIsAdmin = users.filter(user => user._id === id)[0].isAdmin;
        fetch(`${src}/api/users/update/${id}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    isAdmin: newIsAdmin
                })
            }
        )
        .then(res => res.json())
        .then(res => {
            console.log(res);
            getUsers()
        })
    }

    const deleteUser = (id) => {
        fetch(`${src}/api/users/${id}`,
            {
                method: "DELETE",
            }
        )
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })

        deleteUsersProfiles(id)
    }

    const deleteUsersProfiles = (id) => {
        fetch(`${src}/api/profiles/all/${id}`,
            {
                method: "DELETE",
            }
        )
        .then(res => res.json())
        .then(res => {
            console.log(res);
            getUsers()
        })
    }

    return (
        <UsersList 
            users={users} 
            deleteUserClick={deleteUser} 
            changeUserClick={changeUser} 
            setUsers={setUsers} 
            src={src} 
        />
    )
}

export default Users;