import axios from 'axios';

const API_URL = 'http://localhost:5000/api/clients/';

const getClients = async () => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

const getClient = async (id) => {
    const response = await axios.get(API_URL + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

const createClient = async (client) => {
    const response = await axios.post(API_URL, client, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

const updateClient = async (id, client) => {
    const response = await axios.put(API_URL + id, client, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

const deleteClient = async (id) => {
    const response = await axios.delete(API_URL + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

export default {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
};
