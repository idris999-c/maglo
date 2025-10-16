import React from 'react';

export default function Topbar({ user, onOpenSidebar }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onOpenSidebar} className="lg:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <img src="/icons/topbar/search.1 1.svg" alt="Search" className="h-5 w-5 opacity-70" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <img src="/icons/topbar/notification-bing.5 1.svg" alt="Notifications" className="h-5 w-5 opacity-70" />
          </button>
          <div className="flex items-center gap-3 bg-[#FAFAFA] rounded-full pl-3 pr-4 py-2">
            <img src="/icons/topbar/Ellipse 1.svg" alt="Avatar" className="h-8 w-8 rounded-full" />
            <span className="text-sm font-medium text-gray-900">{user?.fullName || user?.name || 'Kullanıcı'}</span>
            <img src="/icons/topbar/Dropdown.svg" alt="Dropdown" className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}


