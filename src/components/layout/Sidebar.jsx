import { useState, useEffect } from 'react';
import { 
  BarChart3, Users, Settings, Bell, MessageSquare, 
  CheckSquare, TrendingUp, Shield, Activity, FileText, Menu, X 
} from 'lucide-react';
import { notificationsAPI } from '../../utils/api';

const roleMenus = {
  admin: [
    { icon: Activity, label: 'System Health', path: '/admin' },
    { icon: Users, label: 'User Management', path: '/admin/users' },
    { icon: Shield, label: 'Access Roles', path: '/admin/roles' },
    { icon: FileText, label: 'Application Logs', path: '/admin/logs' },
    { icon: Settings, label: 'Global Settings', path: '/admin/settings' },
  ],
  manager: [
    { icon: BarChart3, label: 'Team Dashboard', path: '/manager' },
    { icon: Users, label: 'Employees', path: '/user-management' },
    { icon: CheckSquare, label: 'Assign Tasks', path: '/manager/tasks' },
    { icon: TrendingUp, label: 'Team Performance', path: '/manager/performance' },
    { icon: MessageSquare, label: 'Chat', path: '/manager/chat' },
    { icon: Bell, label: 'Notifications', path: '/manager/notifications' },
  ],
  employee: [
    { icon: CheckSquare, label: 'My Tasks', path: '/employee' },
    { icon: TrendingUp, label: 'My Performance', path: '/employee/performance' },
    { icon: MessageSquare, label: 'Chat', path: '/employee/chat' },
    { icon: Bell, label: 'Notifications', path: '/employee/notifications' },
  ],
};

export default function Sidebar({ userRole = 'employee', currentPath = '/', onNavigate, isMobileOpen, setIsMobileOpen }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuItems = roleMenus[userRole] || roleMenus.employee;

  useEffect(() => {
    const loadNotificationCount = async () => {
      try {
        const response = await notificationsAPI.getNotifications();
        if (response.success) {
          const notifications = response.data || [];
          setUnreadCount(notifications.filter(n => !n.read).length);
        }
      } catch (error) {
        // Set mock count if API fails
        setUnreadCount(2);
      }
    };

    loadNotificationCount();
    
    // Refresh count every 30 seconds
    const interval = setInterval(loadNotificationCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 fixed lg:relative z-50 h-full ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          isExpanded ? 'w-64' : 'w-16 lg:w-16'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          {isExpanded && (
            <span className="font-semibold text-gray-900 dark:text-white">TaskManager</span>
          )}
        </div>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => {
                if (onNavigate) {
                  onNavigate(item.path);
                  // Clear notification count when visiting notifications page
                  if (item.path.includes('/notifications')) {
                    setUnreadCount(0);
                  }
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary border-r-2 border-primary'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <Icon className="w-5 h-5" />
                {isExpanded && (
                  <span className="ml-3">{item.label}</span>
                )}
              </div>
              {item.label === 'Notifications' && unreadCount > 0 && (
                <span className="min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      
      {/* Mobile Close Button */}
      <button
        onClick={() => setIsMobileOpen(false)}
        className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
    </>
  );
}