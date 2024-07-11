import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:5000/api/customers', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setCustomers(result.data);
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/customers/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCustomers(customers.filter(customer => customer.id !== id));
    };

    return (
        <div>
            <h2>Customers</h2>
            <Link to="/customers/new">Add Customer</Link>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        {customer.name} - {customer.email}
                        <Link to={`/customers/${customer.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(customer.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
