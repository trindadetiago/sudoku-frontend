// services/api.ts
import axios, { AxiosResponse } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'; // Changeable base URL

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 500000, // Timeout in case of long requests
});

// Request function for general usage
export const makeRequest = async <T>(endpoint: string, method: 'GET' | 'POST', data?: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw new Error('Failed to fetch data');
  }
};
