import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'http://localhost:8000/logout/'; 
export default function Logout() {
  const navigate = useNavigate();
    useEffect(() => {
        axios.get(apiUrl, { withCredentials: true })
        .then(response => {
          const cookieValue = response.data;
          console.log('Cookie value:', cookieValue);
          navigate('/', { replace: true });
        })
        .catch(error => {
          console.error('Error retrieving cookie:', error);
        });
  
        },[]);
  return 
}
