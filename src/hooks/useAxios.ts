import axios from 'axios';
import React, { useEffect, useState } from 'react';
const useAxios = () => { 
  const [loading, setLoading] = useState<boolean>(false);

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5173',
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  let controller = new AbortController();

  useEffect(() => {
    return () => controller?.abort();
  }, []);

  const sendRequest = async ({ url, method, data = {}, params = {} }: any) => {
    controller.abort();
    controller = new AbortController();
    setLoading(true);
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        signal: controller.signal,
      });
      return result;
    } catch (e: any) {
      if (axios.isCancel(e)) {
        console.error('Request cancelled', e.message);
      } else {
        throw new Error(e.response ? e.response.data : e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return {loading,sendRequest};
};
export default useAxios;
