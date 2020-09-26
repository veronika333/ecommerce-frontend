import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';

 const UserDashboard = () => {

 const {user: {_id, name, email, role}} = isAuthenticated()   //destructing isAuthenticated
    return (
        <Layout title="Dashboard" description="User dashboard" className="container">
<div className="card mb-5">
    <h3 className="card-header">User information</h3>
<ul className="list-group">
<li className="list-group-item">{name}</li>
<li className="list-group-item">{email}</li>
<li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
</ul>
</div>
<div className="card mb-5">
<h3 className="card-header">Purchase history</h3>
<ul className="list-group">
<li className="list-group-item">history</li>
</ul>
</div>
        </Layout>
    )
}
export default UserDashboard;