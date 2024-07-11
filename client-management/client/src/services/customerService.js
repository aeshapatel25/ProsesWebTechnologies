import axios from 'axios';

const API_URL = 'http://localhost:5000/api/customers/';

const getCustomers = async () => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

const getCustomer = async (id) => {
    const response = await axios.get(API_URL + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

const createCustomer = async (customer) => {
    const response = await axios.post(API_URL, customer, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

const updateCustomer = async (id, customer) => {
    const response = await axios.put(API_URL + id, customer, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

const deleteCustomer = async (id) => {
    const response = await axios.delete(API_URL + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

export default {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
