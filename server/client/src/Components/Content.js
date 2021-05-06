import React, { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import Registration from './Authirisation';
import ProfilesTable from './ProfilesTable';
import Users from './Users/Users';
import { UserContext } from '../Context';

const Content = (props) => {
    const { userId, isAdmin } = useContext(UserContext);

    useEffect(() => {
         if (!userId) props.history.push('/authorisation');
    }, [userId])

    return (
        <main style={{margin: "25px"}}>
            <Switch>
                <Route path="/authorisation" component={Registration} />
                <Route path={`/${userId}`} component={ProfilesTable} />
                {isAdmin ?
                    <Route path="/users" component={Users} />
                : null}
                <Route path="*" component={Registration}/>
            </Switch>
        </main>
    )
}

export default withRouter(Content);