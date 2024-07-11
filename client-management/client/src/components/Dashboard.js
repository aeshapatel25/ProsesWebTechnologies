import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li><Link to="/clients">Client Master</Link></li>
                    <li><Link to="/customers">Customer Master</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;
