import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [authError, setAuthError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setAuthError('');
    };

    const has8Chars = formData.username.length >= 8;
    const hasLowercase = /[a-z]/.test(formData.password);
    const hasUppercase = /[A-Z]/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*]/.test(formData.password);
    const passwordMatch = formData.password === formData.confirmPassword;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    const getPasswordStrength = () => {
        let strength = 0;
        if (formData.password.length >= 8) strength++;
        if (hasLowercase) strength++;
        if (hasUppercase) strength++;
        if (hasSpecialChar) strength++;
        return strength;
    };

    const getStrengthColor = () => {
        const strength = getPasswordStrength();
        if (strength === 0) return 'bg-gray-200';
        if (strength === 1) return 'bg-red-300';
        if (strength === 2) return 'bg-red-400';
        if (strength === 3) return 'bg-red-500';
        return 'bg-red-600';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/adduser', { firstName: formData.firstName, lastName: formData.lastName, email: formData.email, username: formData.username, password: formData.password });
            if(response.status === 201) {
                setSuccessMessage('User registered successfully');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else if(response.status === 300) {
                setAuthError('User already exists');
            }
        } catch (error) {
            setAuthError(error.message || 'An error occurred during signup');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center py-12 px-4">
            <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-xl border border-red-100">
                <h2 className="mt-2 text-center text-3xl font-bold text-red-900">
                    Create your account
                </h2>
                <div className="w-16 h-1 mx-auto bg-red-500 rounded-full"></div>
                
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input 
                                    name="firstName" 
                                    type="text" 
                                    placeholder="First Name" 
                                    value={formData.firstName} 
                                    onChange={handleChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input 
                                    name="lastName" 
                                    type="text" 
                                    placeholder="Last Name" 
                                    value={formData.lastName} 
                                    onChange={handleChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" 
                                    required 
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input 
                                name="email" 
                                type="email" 
                                placeholder="Email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" 
                                required 
                            />
                            {!validEmail && formData.email && 
                                <p className="text-xs text-red-600 mt-1 ml-1">Invalid email format</p>
                            }
                        </div>
                        
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input 
                                name="username" 
                                type="text" 
                                placeholder="Username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" 
                                required 
                            />
                            {!has8Chars && formData.username && 
                                <p className="text-xs text-red-600 mt-1 ml-1">Username must be at least 8 characters</p>
                            }
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input 
                                name="password" 
                                type="password" 
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleChange} 
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
                        
                        <div className="space-y-2 mt-1">
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-300 ${getStrengthColor()}`}
                                    style={{ width: `${(getPasswordStrength() / 4) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-600">
                                Password strength: {
                                    getPasswordStrength() === 0 ? 'Very Weak' :
                                    getPasswordStrength() === 1 ? 'Weak' :
                                    getPasswordStrength() === 2 ? 'Medium' :
                                    getPasswordStrength() === 3 ? 'Strong' :
                                    'Very Strong'
                                }
                            </p>
                        </div>
                        
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input 
                                name="confirmPassword" 
                                type="password" 
                                placeholder="Confirm Password" 
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" 
                                required 
                            />
                            {!passwordMatch && formData.confirmPassword && 
                                <p className="text-xs text-red-600 mt-1 ml-1">Passwords do not match</p>
                            }
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
                        disabled={!has8Chars || !hasLowercase || !hasUppercase || !hasSpecialChar || !passwordMatch || !validEmail}
                    >
                        Create Account
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
                    Already have an account? <a href="/login" className="font-medium text-red-600 hover:text-red-800 transition-colors">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;