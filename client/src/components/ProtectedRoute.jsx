import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoutes = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false); 
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/getuser', { withCredentials: true });
                if (response.status === 200) {
                    setUser(true);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        const fetchAdmin = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/getadmin', { withCredentials: true });
                if (response.status === 200) {
                    setAdmin(true);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchAdmin();
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    border: '5px solid #f3f3f3',
                    borderTop: '5px solid #3498db',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}>
                    <style>
                        {`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}
                    </style>
                </div>
            </div>
        );
    }

    const isAdminRoute = location.pathname.startsWith('/admin');

    if (isAdminRoute) {
        return admin ? <Outlet /> : <Navigate to="/" />;
    } else {
        return user ? <Outlet /> : <Navigate to="/login" />;
    }
};

export default ProtectedRoutes;
