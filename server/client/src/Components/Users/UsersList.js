import React from 'react';
import {Row, Col, Accordion} from 'react-bootstrap';
import User from '../User/User';
import Statistics from '../Statistics';

const UsersList = ({ users, deleteUserClick, changeUserClick, setUsers, src }) => {
    return (
        <Row>
            <Col sm={8}>
                <Accordion>
                    { users.map(user => {
                        const {_id, email, password, isAdmin} = user;
                    
                        return <User 
                                    key={users.indexOf(user)} 
                                    num={users.indexOf(user)} 
                                    email={email} 
                                    password={password} 
                                    isAdmin={isAdmin} 
                                    userId={_id} 
                                    changeUserClick={changeUserClick} 
                                    deleteUserClick={deleteUserClick} 
                                    removeUserFromList={(id) => setUsers(users.filter(user => user._id !== id))}
                                    src={src}
                                />
                    })}
                </Accordion>
            </Col>
                   
            <Col sm={4}>
                <Statistics amountOfUsers={users.length} src={src}/>
            </Col>
        </Row>
    )
}

export default UsersList;