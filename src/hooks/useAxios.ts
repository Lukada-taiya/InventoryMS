import axios from 'axios';
import React, { useState } from 'react';

export const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create();

//   const fetchData = async ({ url, method, data, params }) => {
//     setLoading(true);
//     try {
//       // const
//     } catch (e) {
//     } finally {
//     }
//   };
};
