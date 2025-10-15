import React from 'react';

export default function Topbar({ user, onOpenSidebar }) {
  return (
    <div className="h-14 bg-white rounded-xl flex items-center justify-between px-4 md:px-6 mt-10 md:mt-14 mx-2 md:mx-4">
      <div className="flex items-center gap-2">
        <button onClick={onOpenSidebar} className="md:hidden p-2 rounded hover:bg-gray-100" aria-label="Open menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 md:gap-12">
        <img src="/icons/topbar/search.1 1.svg" alt="Search" className="h-6 opacity-70" />
        <img src="/icons/topbar/notification-bing.5 1.svg" alt="Notifications" className="h-6 opacity-70" />
        <div className="flex items-center gap-2 sm:gap-3 bg-[#FAFAFA] rounded-full px-2.5 sm:px-3 py-1.5">
          <img src="/icons/topbar/Ellipse 1.svg" alt="Avatar" className="h-8 w-8 rounded-full" />
          <span className="text-md font-medium text-gray-900 pr-12">{user?.fullName || user?.name || 'Kullanıcı'}</span>
          <img src="/icons/topbar/Dropdown.svg" alt="Dropdown" className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}


