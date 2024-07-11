import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditClient = () => {
    const [client, setClient] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        subscriptionStartDate: '',
        subscriptionEndDate: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const result = await axios.get(`http://localhost:5000/api/clients/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setClient(result.data);
            };

            fetchData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (client.password !== client.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (new Date(client.subscriptionStartDate) >= new Date(client.subscriptionEndDate)) {
            alert('Start date should be smaller than end date');
            return;
        }

        try {
            if (id) {
                await axios.put(`http://localhost:5000/api/clients/${id}`, client, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
            } else {
                await axios.post('http://localhost:5000/api/clients', client, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
            }
            navigate('/clients');
        } catch (error) {
            console.error('Error:', error);
            // Handle error as needed
        }
    };
    
    return (
        <div>
            <h2>{id ? 'Edit Client' : 'Add Client'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={client.name} onChange={handleChange} placeholder="Client Name" required />
                <input type="email" name="email" value={client.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="mobile" value={client.mobile} onChange={handleChange} placeholder="Mobile" required />
                <textarea name="address" value={client.address} onChange={handleChange} placeholder="Address" required />
                <input type="date" name="subscriptionStartDate" value={client.subscriptionStartDate} onChange={handleChange} required />
                <input type="date" name="subscriptionEndDate" value={client.subscriptionEndDate} onChange={handleChange} required />
                <input type="password" name="password" value={client.password} onChange={handleChange} placeholder="Password" required />
                <input type="password" name="confirmPassword" value={client.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
                <button type="submit">{id ? 'Update Client' : 'Add Client'}</button>
            </form>
        </div>
    );
};

export default AddEditClient;
