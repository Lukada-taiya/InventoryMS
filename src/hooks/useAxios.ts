import axios from 'axios';
import React, { useEffect, useState } from 'react';
const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: "https://localhost:7000"
  });

  axiosInstance.interceptors.request.use((config) => {
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  axiosInstance.interceptors.request.use((response) => {
    return response;
  }, (error) => {
    return Promise.reject(error);;
  });

  let controller = new AbortController();

  useEffect(() => {
    return () => controller?.abort();
  },[]);

  const sendRequest = async ({ url, method, data = {}, params = {}} : any) => {
    controller.abort();
    controller = new AbortController();
    setLoading(true);
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        signal: controller.signal
      });
      setResponse(result.data);
    } catch (e: any) {
      axios.isCancel(e) ? console.error("Request cancelled", e.message) : setError(e.response ? e.response.data : e.message);
    } finally {
      setLoading(false);
    }
  };
  return {response, error, loading, sendRequest};
};
export default useAxios;
