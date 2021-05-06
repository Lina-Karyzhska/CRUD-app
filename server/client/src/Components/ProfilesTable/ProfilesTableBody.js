import React from 'react';
import Profile from './Profile';

const ProfilesTableBody = ({ profiles, userId, setProfiles, src }) => {
    const deleteProfile = (num) => {
        setProfiles(profiles.filter(profile => profiles.indexOf(profile) !== num))
    }

    const addProfile = (profile) => {
        const newProfiles = [...profiles];
        newProfiles.push(profile);
        setProfiles(newProfiles);
    }

    return (
        <>
            { profiles.length ? profiles.map(profile => {
                const {_id, name, gender, city, birthdate} = profile;
                return <Profile 
                            key={profiles.indexOf(profile)} 
                            id={_id} 
                            name={name} 
                            gender={gender} 
                            date={new Date(birthdate)} 
                            city={city} 
                            num={profiles.indexOf(profile) + 1} 
                            editing={false} 
                            deleteProfileFromArr={deleteProfile}
                            addProfile={addProfile} 
                            userId={userId} 
                            src={src}
                        />
            }) : null }
        </>
    )
}

export default ProfilesTableBody;