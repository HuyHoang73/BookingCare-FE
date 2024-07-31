import { get, post, put, del } from '../utils/api';

const BASE_URL = '/api/majors';

export const getAllMajors = () => {
    return get(BASE_URL);
};

export const getMajorById = (id) => {
    return get(`${BASE_URL}/${id}`);
};

export const createMajor = (majorData) => {
    return post(BASE_URL, majorData);
};

export const updateMajor = (majorData) => {
    return put(BASE_URL, majorData);
};

export const deleteMajor = (id) => {
    return del(`${BASE_URL}/${id}`);
};
