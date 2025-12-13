import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authAPI, setAuthToken } from '../utils/api';
import { Loader2, AlertCircle } from 'lucide-react';

const MagicLogin = ({ onLogin }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            const token = searchParams.get('token');

            if (!token) {
                setError('No magic link token found.');
                setIsVerifying(false);
                return;
            }

            try {
                const response = await authAPI.verifyMagicLink(token);
                if (response.success) {
                    setAuthToken(response.token);
                    onLogin(response.user);
                    // Redirect to dashboard based on role
                    navigate(`/${response.user.role}`);
                } else {
                    setError(response.error || 'Magic link verification failed.');
                }
            } catch (err) {
                console.error('Magic login error:', err);
                setError(err.message || 'An error occurred during login.');
            } finally {
                setIsVerifying(false);
            }
        };

        verifyToken();
    }, [searchParams, navigate, onLogin]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Failed</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900">Logging you in...</h2>
                <p className="text-gray-500 mt-2">Please wait while we verify your magic link.</p>
            </div>
        </div>
    );
};

export default MagicLogin;
