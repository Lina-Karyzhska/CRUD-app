import React, { useState, useEffect } from 'react';
// import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle, Accordion, Card, ButtonGroup, Button, Table, FormControl } from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import FormControl from 'react-bootstrap/FormControl'
import ProfilesTableBody from '../ProfilesTable/ProfilesTableBody';

const TogglePtofiles = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {}
  );

  return (
    <p
      style={{ margin: "0", textAlign: "left", display: "flex", alignItems: "center" }}
      onClick={decoratedOnClick}
    >
      <span style={{verticalAlign: "middle"}}>{children}</span>
    </p>
  );
}

const User = ({ userId, email, password, isAdmin, changeUserClick, deleteUserClick, num, src }) => {
    const [profiles, setProfiles] = useState([]);
    const [newData, setData] = useState({
        password: password,
        isAdmin: isAdmin
    });
    const [isChanging, toggleChanging] = useState(false);

    const getProfiles = async (bool) => {
        const response = await fetch(`${src}/api/profiles/${userId}`);
        if (bool) setProfiles(await response.json());
    }

    useEffect(() => {
        let isMounted = true;
        getProfiles(isMounted);
        return () => {isMounted = false};
        // eslint-disable-next-line
    }, [])

    const onChangeUser = () => {
        changeUserClick(userId, password, true);
        setData(prevState => ({...prevState, isAdmin: true}));
    }

    const onDeleteUser = () => {
        deleteUserClick(userId);
    }

    const onChangeInputs = (e) => setData(prevState => ({...prevState, password: e.target.value}))

    const onSave = () => {
        if (isChanging) changeUserClick(userId, newData.password);
         
        toggleChanging(!isChanging);
    }
    
    return (
        <Card>
            <Card.Header style={{flexWrap: "wrap"}}>
                <TogglePtofiles as={Card.Header} eventKey={`${num}`}>
                    { email }
                </TogglePtofiles>

                <FormControl
                    required
                    name="password"
                    type="text"
                    placeholder="Password"
                    defaultValue={password}
                    disabled={!isChanging}
                    onChange={onChangeInputs}
                    style={{width: "70px"}}
                />
                <ButtonGroup>
                    <Button variant="outline-info" onClick={onSave}>
                        { isChanging ? "Save" : "Change password"}
                    </Button>
                    <Button disabled={isAdmin} variant="outline-success" style={{width: "160px"}} onClick={onChangeUser}> 
                        { newData.isAdmin ? "Admin" : "Set user to admin" }
                    </Button>
                    <Button variant="outline-danger" onClick={onDeleteUser}>
                        Delete
                    </Button>
                </ButtonGroup>
            </Card.Header>

            <Accordion.Collapse eventKey={`${num}`}>
                <Card.Body>
                    <Table style={{margin: 0}} striped bordered hover>
                        <tbody>
                            { profiles.length ? 
                                <ProfilesTableBody 
                                    profiles={profiles} 
                                    setProfiles={setProfiles} 
                                    src={src}
                                /> 
                            : 
                                <tr style={{lineHeight: "50px"}}>
                                    <td>This user haven't profiles yet.</td>
                                </tr> 
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default User;