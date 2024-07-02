import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
const taskUrl = 'http://localhost:5000/api/v1/tasks';

export const getTasks = async (id) => {
    id = id || '';
    return await axios.get(`${taskUrl}/${id}`);
}

export const addTask = async (task) => {
    return await axios.post(`${taskUrl}`, task);
}

export const deleteTask = async (id) => {
    return await axios.delete(`${taskUrl}/${id}`);
}

export const editTask = async (id, task) => {
    return await axios.patch(`${taskUrl}/${id}`, task)
}