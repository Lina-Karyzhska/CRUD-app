import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Statistics = ({ amountOfUsers, src }) => {
    const [information, setInformation] = useState({
        amountOfProfiles: 0,
        amountProfilesOlder18: 0
    });

    const getInfromation = () => {
        fetch(`${src}/api/profiles/`)
        .then(res => res.json())
        .then(profiles => {
            setInformation({
                amountOfProfiles: profiles.length,
                amountProfilesOlder18: getProfilesOlder18(profiles)
            })
        })
    }

    const getProfilesOlder18 = (arr) => {
        return arr.filter(el => countAge(el.birthdate) >= 18).length
    }

    const countAge = (date) => {
        const milliseconds = new Date() - new Date(date);
        const age = new Date(milliseconds).getFullYear() - 1970;
        return age;
    }

    useEffect(() => {
        getInfromation()
    }, [amountOfUsers]);

    return (
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Card.Title>
                        Amount of users:
                    </Card.Title>
                    <Card.Text>
                        {amountOfUsers}
                    </Card.Text>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Card.Title>
                        Amount of profiles:
                    </Card.Title>
                    <Card.Text>
                        {information.amountOfProfiles}
                    </Card.Text>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Card.Title>
                        Amount of users older then 18:
                    </Card.Title>
                    <Card.Text>
                        {information.amountProfilesOlder18}
                    </Card.Text>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default Statistics;