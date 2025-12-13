import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children, userRole = 'employee', userName = 'John Doe', userProfile, currentPath = '/', onNavigate, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        userRole={userRole}
        currentPath={currentPath}
        onNavigate={onNavigate}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden dark:bg-gray-900 lg:ml-0">
        <Header
          userRole={userRole}
          userName={userName}
          userProfile={userProfile}
          onLogout={onLogout}
          onNavigate={onNavigate}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <main className="flex-1 overflow-auto p-4 lg:p-6 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}