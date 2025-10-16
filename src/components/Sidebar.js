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
    <aside className="h-full">
      <div className="bg-[#FAFAFA] p-6 flex flex-col h-full">
        <div className="mb-8 flex items-center">
          <img src="/icons/auth/Logo.png" alt="Maglo" className="h-8 w-32" />
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-[#C8EE44] text-gray-900' : 'text-gray-500 hover:bg-gray-100'
                }`
              }
              end={item.to === '/'}
            >
              <img src={item.icon} alt={item.label} className="h-5 w-5" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-2 mt-auto">
          <a href="#help" className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-500 hover:bg-gray-100">
            <img src="/icons/sidebar/Help.svg" alt="Help" className="h-5 w-5" />
            <span>Help</span>
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <img src="/icons/sidebar/Logout.svg" alt="Logout" className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}


