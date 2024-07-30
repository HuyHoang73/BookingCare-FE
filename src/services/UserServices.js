import { get, post, put, del } from '../utils/api';

const BASE_URL = '/api/users';

export const getAllUsers = () => {
    return get(BASE_URL);
};

export const getUserById = (id) => {
    return get(`${BASE_URL}/${id}`);
};

export const createUser = (userData) => {
    return post(BASE_URL, userData);
};

export const updateUser = (id, userData) => {
    return put(`${BASE_URL}/${id}`, userData);
};

export const deleteUser = (id) => {
    return del(`${BASE_URL}/${id}`);
};
