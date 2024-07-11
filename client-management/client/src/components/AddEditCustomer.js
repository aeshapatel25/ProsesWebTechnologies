import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditCustomer = () => {
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        mobile: '',
        country: '',
        state: '',
        city: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const result = await axios.get(`http://localhost:5000/api/customers/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setCustomer(result.data);
            };

            fetchData();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await axios.put(`http://localhost:5000/api/customers/${id}`, customer, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
        } else {
            await axios.post('http://localhost:5000/api/customers', customer, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
        }

        navigate('/customers');
    };

    return (
        <div>
            <h2>{id ? 'Edit Customer' : 'Add Customer'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={customer.name} onChange={handleChange} placeholder="Customer Name" required />
                <input type="email" name="email" value={customer.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="mobile" value={customer.mobile} onChange={handleChange} placeholder="Mobile" required />
                <select name="country" value={customer.country} onChange={handleChange} required>
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                </select>
                <select name="state" value={customer.state} onChange={handleChange} required>
                    <option value="">Select State</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="California">California</option>
                    <option value="London">London</option>
                </select>
                <input type="text" name="city" value={customer.city} onChange={handleChange} placeholder="City" required />
                <button type="submit">{id ? 'Update Customer' : 'Add Customer'}</button>
            </form>
        </div>
    );
};

export default AddEditCustomer;
