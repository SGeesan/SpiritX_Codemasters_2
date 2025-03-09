import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [authError, setAuthError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setAuthError('');
    }

    useEffect(() => {
        const checkRememberMe = async () => {
            const response = await axios.get('http://localhost:5000/api/users/getrememberme');
            if (response.status === 200) {
                setFormData({
                    username: response.data.username,
                    password: response.data.password
                });
                setRememberMe(true);
            }
        }
        checkRememberMe();
    }, []);

    const has8Chars = formData.username.length >= 8;
    const hasLowercase = /[a-z]/.test(formData.password);
    const hasUppercase = /[A-Z]/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*]/.test(formData.password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            if (response.status === 200) {
                setAuthError('');
                setSuccessMessage("User login successful");
                setTimeout(() => {
                    navigate(`/home/${response.data.teamId}`);
                }, 2000);
            } else if(response.status === 300){
                setAuthError("Invalid username or password");
            }
        } catch (error) {
            setAuthError(error.message || 'An error occurred during login');
        }
    }


    return (
        <div className="flex min-h-screen items-center justify-center  py-12 px-4">
            <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-xl border border-red-100">
                <h2 className="mt-2 text-center text-3xl font-bold text-red-900">
                    Login to your account
                </h2>
                <div className="w-16 h-1 mx-auto bg-red-500 rounded-full"></div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                required
                            />
                            {formData.username && !has8Chars && (
                                <p className="text-xs text-red-600 mt-1 ml-1">Username must be at least 8 characters</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                required
                            />
                            <div className="mt-2">
                                {formData.password && !hasLowercase && 
                                    <p className="text-xs text-red-600 mb-1">• Password must contain a lowercase letter</p>
                                }
                                {formData.password && !hasUppercase && 
                                    <p className="text-xs text-red-600 mb-1">• Password must contain an uppercase letter</p>
                                }
                                {formData.password && !hasSpecialChar && 
                                    <p className="text-xs text-red-600 mb-1">• Password must contain a special character</p>
                                }
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                    onChange={async () => {
                                        const newRememberMe = !rememberMe;
                                        setRememberMe(newRememberMe);
                                        const response = await axios.post('http://localhost:5000/api/users/rememberme', { username: formData.username, password: formData.password});
                                        if (response.status === 200) {
                                            setAuthError('');
                                            setSuccessMessage("Remember me successful");
                                        } else {
                                            setSuccessMessage('');
                                            setAuthError("Remember me unsuccessful");
                                        }
                                    }}
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-red-600 hover:text-red-800 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                    </div>

                    {authError && (
                        <div className="rounded-md bg-red-50 p-4 border border-red-200">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">{authError}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {successMessage && (
                        <div className="rounded-md bg-green-50 p-4 border border-green-200">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l5.707-5.707z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">{successMessage}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2.5 px-4 rounded-md font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        disabled={!formData.username || !formData.password || !has8Chars || !hasLowercase || !hasUppercase || !hasSpecialChar}
                    >
                        Sign In
                    </button>
                </form>
                
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                    </div>
                </div>
                
                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="font-medium text-red-600 hover:text-red-800 transition-colors">
                        Register Now
                    </a>
                </p>
            </div>
        </div>
    )
}

export default LoginPage