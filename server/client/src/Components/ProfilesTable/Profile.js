import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Profile = ({ id, num, name, date, city, gender, deleteProfileFromArr, addProfile, add, editing, userId, src }) => {
    const [isChanging, setChanging] = useState(editing);
    const [profileInfo, setProfileInfo] = useState({
        userId: userId,
        name: name,
        birthdate: date,
        gender: gender,
        city: city
    })

    const deleteProfile = () => {
        deleteProfileFromArr(num - 1);

        fetch(`${src}/api/profiles/${id}`, 
        {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err));
    }

    const saveProfile = () => {
        setChanging(false);

        fetch(`${src}/api/profiles/update/${id}`, 
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...profileInfo})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        });
    }

    const createProfile = () => {
        addProfile(profileInfo);

        if (validation()) {
            fetch(`${src}/api/profiles/add`, 
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...profileInfo})
                })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
        } else {
            alert("There must be no empty fields.");
        }
    }

    const validation = () => {
        return profileInfo.name && profileInfo.city
    }

    const handleChange = (e) => {
        setProfileInfo({...profileInfo, [e.target.name]: e.target.value});
    }

    const onchangeDate = (date) => setProfileInfo({...profileInfo, birthdate: date})
    
    const onEdit = () => setChanging(true)
    
    return (
        <tr id={num}>
            <td>{num}</td>
            <td>
                <Form.Control
                    name="name"
                    type="text"
                    placeholder="Name"
                    defaultValue={profileInfo.name}
                    disabled={!isChanging}
                    onChange={handleChange}
                />
            </td>
            <td>
                <Form.Control name="gender" as="select" defaultValue={profileInfo.gender} disabled={!isChanging} onChange={handleChange}>
                    <option>male</option>
                    <option>female</option>
                    <option>other</option>
                </Form.Control>
            </td>
            <td>
                <DatePicker 
                    dateFormat="yyyy-MM-dd"
                    selected={profileInfo.birthdate}
                    disabled={!isChanging} 
                    onChange={onchangeDate} 
                    className="form-control"
                />
            </td>
            <td>
                <Form.Control
                    name="city"
                    type="text"
                    placeholder="City"
                    defaultValue={profileInfo.city}
                    disabled={!isChanging}
                    onChange={handleChange}
                />
            </td>
            <td>
                { !isChanging ? 
                    <ButtonGroup>
                        <Button variant="info" onClick={onEdit}>Edit</Button>
                        <Button variant="danger" onClick={deleteProfile}>Delete</Button>
                    </ButtonGroup>
                : add ? 
                    <Button id="create" variant="success" onClick={createProfile}>Create</Button>
                :   
                    <Button variant="success" onClick={saveProfile}>Save</Button>
                }
            </td>
        </tr>
    )
}

export default Profile;