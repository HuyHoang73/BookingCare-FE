import { get, put, del } from '../utils/api';
import axios from '../utils/axiosConfig';

const BASE_URL = '/api/majors';

export const getAllMajors = () => {
    return get(BASE_URL);
};

export const getMajorById = (id) => {
    return get(`${BASE_URL}/${id}`);
};

export const createMajor = (majorData) => {
    return axios.post(BASE_URL, majorData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateMajor = (majorData) => {
    return put(BASE_URL, majorData);
};

export const deleteMajor = (id) => {
    return del(`${BASE_URL}/${id}`);
};
