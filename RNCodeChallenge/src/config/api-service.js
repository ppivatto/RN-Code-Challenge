import {Api} from '../@externalUtil/make-request';
import {BASE_URL, PORT} from './constants';

const apiBaseUrl = (PORT) ? `${BASE_URL}:${PORT}/api` : `${BASE_URL}/api`;
const authBaseUrl = (PORT) ? `${BASE_URL}:${PORT}/auth` : `${BASE_URL}/auth`;

const loginHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic YWRtaW46S01xNV5TdzpybXtmNmhASg',
};

const apiHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
};

const firebaseConfig = {
    apiKey: "AIzaSyDaZcNc-zrMpjNenlNgS6NanPgM7MmdtPg",
    authDomain: "storage-bethere-test.firebaseapp.com",
    databaseURL: "https://storage-bethere-test.firebaseio.com",
    projectId: "storage-bethere-test",
    storageBucket: "storage-bethere-test.appspot.com",
    messagingSenderId: "527109187243"
}

export const loginService = new Api(authBaseUrl, {timeout: 30000, headers: loginHeaders});
export const apiService = new Api(apiBaseUrl, {timeout: 30000, headers: apiHeaders});