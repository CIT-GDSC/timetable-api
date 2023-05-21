import { createBrowserRouter,  Router, Route, Navigate } from 'react-router-dom'
import Home from './components/Home/Home';
import authLayout from './components/layouts/authLayout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import React from 'react';

const router = createBrowserRouter([
    {
        path: '/', element: <Home />
    },
    {
        path: '/auth/', element: <authLayout />,
        children: [
            { path: 'register', element: <Register /> },
            { path: '/', element: <Navigate to="/login" /> }
        ]
    }
]);


export default router;
