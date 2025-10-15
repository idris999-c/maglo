import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ onLogout }) {
  const navItems = [
    { label: 'Dashboard', icon: '/icons/sidebar/Dashboard.svg', to: '/' },
    { label: 'Transactions', icon: '/icons/sidebar/Transactions.svg', to: '/transactions' },
    { label: 'Invoices', icon: '/icons/sidebar/Invoices.svg', to: '/invoices' },
    { label: 'My Wallets', icon: '/icons/sidebar/My Wallets.svg', to: '/wallets' },
    { label: 'Settings', icon: '/icons/sidebar/Settings.svg', to: '/settings' },
  ];

  return (
    <aside>
      <div className="md:fixed md:top-0 md:left-0 bg-[#FAFAFA]  p-2 md:p-3 pt-0 flex flex-col h-screen md:w-[280px]">
        <div className="px-3 md:px-4 mt-2 md:mt-4 mb-5 md:mb-7 flex items-center">
          <img src="/icons/auth/Logo.png" alt="Maglo" className="h-8" />
        </div>

        <nav className="flex flex-col gap-2 px-3 md:px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 md:py-2.5 rounded-lg text-base transition-colors ${
                  isActive ? 'bg-[#C8EE44] text-gray-900' : 'text-gray-500 hover:bg-gray-100'
                }`
              }
              end={item.to === '/'}
            >
              <img src={item.icon} alt={item.label} className="h-6 w-6" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 md:mt-12 md:py-48 lg:py-72 flex flex-col gap-2 px-3 md:px-4">
          <a href="#help" className="flex items-center gap-3 px-4 py-2 rounded-lg text-base text-gray-500 hover:bg-gray-100">
            <img src="/icons/sidebar/Help.svg" alt="Help" className="h-6 w-6" />
            <span>Help</span>
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-base text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <img src="/icons/sidebar/Logout.svg" alt="Logout" className="h-6 w-6" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}


