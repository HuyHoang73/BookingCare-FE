import { get, put, del } from '../utils/api';
import axios from '../utils/axiosConfig';

const BASE_URL = '/api/users';

export const getAllUsers = () => {
    return get(BASE_URL);
};

export const getUserById = (id) => {
    return get(`${BASE_URL}/${id}`);
};

export const createUser = (userData) => {
    return axios.post(BASE_URL, userData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateUser = (userData) => {
    return put(BASE_URL, userData);
};

export const deleteUser = (id) => {
    return del(`${BASE_URL}/${id}`);
};
