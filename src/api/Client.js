import axios from 'axios';
import {apiConfig} from './apiConfig';

export const Client = axios.create({
  baseURL: apiConfig.baseUrl,
});
