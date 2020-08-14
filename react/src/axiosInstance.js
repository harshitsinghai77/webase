/* global window */
import axios from 'axios';
import { notification } from 'antd';
import { getToken } from './libs/storage/tokenStorage';

// init axios for Node.js
export const axiosInstance_node = axios.create({
  baseURL: process.env.REACT_APP_NODE_APP_BASE_URL,
  timeout: 60 * 1000,
  headers: { 
    'x-auth-token': getToken(), 
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
  },
});

// Add a request interceptor
axiosInstance_node.interceptors.request.use((config) => {
  // Do something before request is sent
  if (getToken()) {
    config.headers['x-auth-token'] = getToken();
  }
  return config;
}, error => Promise.reject(error));

axiosInstance_node.interceptors.response.use(config => config, (error) => {
  console.log('Reached here ' , error.response.data.error)
  if (error.response && error.response.data.error) {
    notification.error({
      message: 'Error',
      description: error.response.data.error,
    });
  }
  return Promise.reject(error);
});

window.axiosInstance = axiosInstance_node;
// done
