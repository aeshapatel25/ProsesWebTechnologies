import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:5000/api/clients', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setClients(result.data);
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/clients/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setClients(clients.filter(client => client.id !== id));
    };

    return (
        <div>
            <h2>Clients</h2>
            <Link to="/clients/new">Add Client</Link>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>
                        {client.name} - {client.email}
                        <Link to={`/clients/${client.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(client.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;
