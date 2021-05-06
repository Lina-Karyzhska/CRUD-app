import React, { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ProfilesTableBody from './ProfilesTableBody';
import Profile from './Profile';
import { UserContext } from '../../Context';

const ProfilesTable = () => {
    const { userId, src } = useContext(UserContext);
    const [profiles, setProfiles] = useState([]);

    const getProfiles = async (bool) => {
        const response = await fetch(`${src}/api/profiles/${userId}`);
        const result = await response.json();
        if (bool) setProfiles([...result]);
    }

    useEffect(() => {
        let isMounted = true;
        getProfiles(isMounted);
        return () => {isMounted = false};
        // eslint-disable-next-line
    }, [])

    const addProfile = (profile) => {
        const newProfiles = [...profiles];
        newProfiles.push(profile);
        setProfiles(newProfiles);
    }

    return (
        <section>
            <h2>Your profiles:</h2>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Birthdate</th>
                        <th>City</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <Profile name="" city="" gender="male" date={new Date()} add={true} editing={true} addProfile={addProfile} userId={userId} num="0" src={src}/>

                    <ProfilesTableBody profiles={profiles} userId={userId} getProfiles={getProfiles} src={src} setProfiles={setProfiles}/>
                </tbody>
            </Table>

            
        </section>
    )
}

export default ProfilesTable;