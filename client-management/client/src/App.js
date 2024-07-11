import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ClientList from './components/ClientList';
import CustomerList from './components/CustomerList';
import AddEditClient from './components/AddEditClient';
import AddEditCustomer from './components/AddEditCustomer';

// Function to check if user is authenticated
const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

// Protected route component
const ProtectedRoute = ({ component: Component, ...rest }) => {
    return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                <Route path="/clients" element={<ProtectedRoute component={ClientList} />} />
                <Route path="/clients/new" element={<ProtectedRoute component={AddEditClient} />} />
                <Route path="/clients/:id" element={<ProtectedRoute component={AddEditClient} />} />
                <Route path="/customers" element={<ProtectedRoute component={CustomerList} />} />
                <Route path="/customers/new" element={<ProtectedRoute component={AddEditCustomer} />} />
                <Route path="/customers/:id" element={<ProtectedRoute component={AddEditCustomer} />} />
            </Routes>
        </Router>
    );
};

export default App;
