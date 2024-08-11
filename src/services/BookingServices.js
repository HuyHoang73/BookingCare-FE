import { get, put, del, post } from '../utils/api';

const BASE_URL = '/api/bookings';

export const getAllBookings = () => {
    return get(BASE_URL);
};

export const getBookingById = (id) => {
    return get(`${BASE_URL}/${id}`);
};

export const createBooking = (bookingData) => {
    return post(BASE_URL, bookingData);
};

export const updateBooking = (bookingData) => {
    return put(BASE_URL, bookingData);
};

export const deleteBooking = (id) => {
    return del(`${BASE_URL}/${id}`);
};
