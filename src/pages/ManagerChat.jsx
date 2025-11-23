import { useState, useEffect } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import Card, { CardHeader, CardContent, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { chatAPI, authAPI } from '../utils/api';

export default function ManagerChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [messagesResponse, userResponse] = await Promise.all([
          chatAPI.getMessages(),
          authAPI.getCurrentUser()
        ]);
        
        if (messagesResponse.success) {
          setMessages(messagesResponse.data || []);
        }
        if (userResponse.success) {
          setCurrentUser(userResponse.user);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Poll for new messages every 3 seconds
    const interval = setInterval(async () => {
      try {
        const response = await chatAPI.getMessages();
        if (response.success) {
          setMessages(response.data || []);
        }
      } catch (error) {
        console.error('Failed to refresh messages:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await chatAPI.sendMessage({
        message: newMessage
      });
      
      if (response.success) {
        setMessages([...messages, response.data]);
        setNewMessage('');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message: ' + error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Team Chat</h1>
        <p className="text-gray-600 mt-1">Communicate with your team members</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Chat</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading messages...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-4 h-96 overflow-y-auto">
                {messages.map((msg) => {
                  const isOwnMessage = currentUser && msg.sender_id._id === currentUser.id;
                  return (
                    <div key={msg._id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-lg ${
                        isOwnMessage ? 'bg-primary text-white' : 'bg-gray-100 text-gray-900'
                      }`}>
                        {!isOwnMessage && (
                          <p className="text-xs font-medium mb-1 opacity-75">{msg.sender_id.name}</p>
                        )}
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-75 mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button onClick={sendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}