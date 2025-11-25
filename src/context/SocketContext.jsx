import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getAuthToken } from '../utils/api';

const SocketContext = createContext(null);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within SocketProvider');
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const token = getAuthToken();

        if (!token) {
            console.log('No auth token, skipping socket connection');
            return;
        }

        // Get socket URL from environment or default to backend URL
        const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ||
            import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ||
            'https://task-manger-backend-z2yz.onrender.com';

        console.log('🔌 Connecting to Socket.io server:', SOCKET_URL);

        // Initialize socket connection with authentication
        const newSocket = io(SOCKET_URL, {
            auth: {
                token: token
            },
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
            transports: ['websocket', 'polling'] // Try WebSocket first, fallback to polling
        });

        // Connection events
        newSocket.on('connect', () => {
            console.log('✅ Socket.io connected');
            setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('❌ Socket.io disconnected');
            setIsConnected(false);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setIsConnected(false);
        });

        // Online users tracking
        newSocket.on('online_users', (users) => {
            console.log('Online users:', users);
            setOnlineUsers(users);
        });

        newSocket.on('user_online', (data) => {
            console.log('User came online:', data.userName);
            setOnlineUsers(prev => [...new Set([...prev, data.userId])]);
        });

        newSocket.on('user_offline', (data) => {
            console.log('User went offline:', data.userName);
            setOnlineUsers(prev => prev.filter(id => id !== data.userId));
        });

        setSocket(newSocket);

        // Cleanup on unmount
        return () => {
            console.log('🔌 Disconnecting socket');
            newSocket.close();
        };
    }, []);

    const value = {
        socket,
        isConnected,
        onlineUsers,
        isUserOnline: (userId) => onlineUsers.includes(userId)
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};
