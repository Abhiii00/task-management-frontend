import axios from 'axios'
import Cookies from 'js-cookie';
import config from './config';
const loginData = (!Cookies.get('Task-Management-Cookies')) ? [] : JSON.parse(Cookies.get('Task-Management-Cookies'));
const serverPath = config.apiUrl

console.log('loginData123', loginData)

export const request = (path, data, method) => {
    
    var options = {
        method: method,
        url: `${serverPath}/${path}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': loginData?.token
        },
        dataType: 'json'
    };

    if (loginData && loginData?.token ) {
        options.headers['Authorization'] = loginData?.token

    }
    if (method === 'GET') {
        options['params'] = data
    } else {
        options['data'] = data
    }
    let res = axios(options)
    res.then(res1 => { })
    return res
}

export const postRequest = async (path, data) => await request(path, data, 'POST')
export const getRequest = async (path, data) => await request(path, data, 'GET')
export const putRequest = async (path, data) => await request(path, data, 'PUT')
export const deleteRequest = async (path, data) => await request(path, data, 'DELETE')
