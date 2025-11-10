import axios from 'axios';

export const api = axios.create({
  	baseURL: 'https://sw-api.starnavi.io',
});