import httpClient from '../http-common';

const getAll = () => {
    return httpClient.get('/user');
}

const create = (data) => {
    return httpClient.post('/user', data);
}

const get = id => {
    return httpClient.get(`/user/${id}`);
}

const update = data => {
    return httpClient.put('/user', data);
}

const remove = id => {
    return httpClient.delete(`/user/${id}`)
}
export default { getAll, create, get, update, remove };

