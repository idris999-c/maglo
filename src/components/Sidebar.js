import React from 'react';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomToast from './CustomToast';

export default function Sidebar({ onLogout }) {
  // Toast mesajları için fonksiyonlar
  const handleSidebarAction = (action, label) => {
    switch (action) {
      case 'navigate':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message={`Navigating to ${label}...`} 
            type="info" 
          />
        ));
        break;
      case 'logout':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Logged out successfully" 
            type="success" 
          />
        ));
        onLogout();
        break;
      case 'logoutError':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Failed to logout" 
            type="error" 
          />
        ));
        break;
      default:
        break;
    }
  };

  const navItems = [
    { label: 'Dashboard', icon: '/icons/sidebar/Dashboard.svg', to: '/' },
    { label: 'Transactions', icon: '/icons/sidebar/Transactions.svg', to: '/transactions' },
    { label: 'Invoices', icon: '/icons/sidebar/Invoices.svg', to: '/invoices' },
    { label: 'My Wallets', icon: '/icons/sidebar/My Wallets.svg', to: '/wallets' },
    { label: 'Settings', icon: '/icons/sidebar/Settings.svg', to: '/settings' },
  ];

  return (
    <aside>
      <div className="md:fixed md:top-0 md:left-0 bg-[#FAFAFA] p-1 sm:p-1.5 md:p-3 pt-0 flex flex-col h-screen w-[140px] sm:w-[160px] md:w-[250px]">
        <div className="px-1 sm:px-1.5 md:px-4 mt-[10px] sm:mt-[15px] md:mt-[30px] mb-[15px] sm:mb-[20px] md:mb-[40px] flex items-center">
          <img src="/icons/auth/Logo.png" alt="Maglo" className="h-[16px] sm:h-[18px] md:h-[30px] w-[64px] sm:w-[72px] md:w-[122px]" />
        </div>

        <nav className="flex flex-col gap-[0.5px] sm:gap-[1px] md:gap-[2px] px-1 sm:px-1.5 md:px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => handleSidebarAction('navigate', item.label)}
              className={({ isActive }) =>
                `flex items-center gap-0.5 sm:gap-1 md:gap-2 px-0.5 sm:px-1 md:px-2 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] md:text-sm transition-colors w-full sm:w-[140px] md:w-[200px] h-[28px] sm:h-[32px] md:h-[48px] ${
                  isActive ? 'bg-[#C8EE44] text-gray-900' : 'text-gray-500 hover:bg-gray-100'
                }`
              }
              end={item.to === '/'}
            >
              <img src={item.icon} alt={item.label} className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-5 md:w-5" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-[80px] sm:mt-[100px] md:mt-[250px] flex flex-col gap-[0.5px] sm:gap-[1px] md:gap-[2px] px-1 sm:px-1.5 md:px-4">
          <a href="#help" className="flex items-center gap-0.5 sm:gap-1 md:gap-2 px-0.5 sm:px-1 md:px-2 py-0.5 sm:py-1 md:py-1.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] md:text-sm text-gray-500 hover:bg-gray-100">
            <img src="/icons/sidebar/Help.svg" alt="Help" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-5 md:w-5" />
            <span>Help</span>
          </a>
          <button
            onClick={() => handleSidebarAction('logout')}
            className="w-full flex items-center gap-0.5 sm:gap-1 md:gap-2 px-0.5 sm:px-1 md:px-2 py-0.5 sm:py-1 md:py-1.5 rounded-md sm:rounded-lg text-left text-[9px] sm:text-[10px] md:text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <img src="/icons/sidebar/Logout.svg" alt="Logout" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-5 md:w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}


