import React, { Component } from 'react';

import Layout from '../Layout/Layout';

export class MyProfile extends Component {
    render() {
        return (
            <Layout>
                <div>
                    <h1>This is the user's profile page</h1>
                    <h1>Upcoming Bookings</h1>
                    <h1>Past Bookings</h1>
                </div>
            </Layout>
        )
    }
}

export default MyProfile;
