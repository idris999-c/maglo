import React from 'react';

export default function Topbar({ user, onOpenSidebar }) {
  return (
    <div className="h-[50px] sm:h-[32px] md:h-[48px] w-full bg-white rounded-lg sm:rounded-xl md:rounded-xl flex items-center justify-between mt-[10px] sm:mt-[15px] md:mt-[30px] ">
      <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
        <button onClick={onOpenSidebar} className="lg:hidden p-2 sm:p-1 md:p-2 rounded hover:bg-gray-100" aria-label="Open menu">
          <svg width="20" height="20" className="sm:w-4 sm:h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <h2 className="text-[15px] sm:text-[16px] md:text-[25px] font-semibold text-gray-900">Dashboard</h2>
      </div>
      <div className="flex items-center gap-4 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12">
        <img src="/icons/topbar/search.1 1.svg" alt="Search" className="h-[15px] w-[15px] sm:h-[14px] sm:w-[14px] md:h-[20px] md:w-[20px] opacity-70" />
        <img src="/icons/topbar/notification-bing.5 1.svg" alt="Notifications" className="h-[15px] w-[15px] sm:h-[14px] sm:w-[14px] md:h-[20px] md:w-[20px] opacity-70" />
        <div className="flex items-center gap-2 sm:gap-1 md:gap-2 bg-[#FAFAFA] rounded-full pl-2 sm:pl-1 md:pl-2 pr-[8px] sm:pr-[6px] md:pr-[15px] py-2 sm:py-1 md:py-1 w-[120px] sm:w-[80px] md:w-[215px] h-[32px] sm:h-[24px] md:h-[48px]">
          <img src="/icons/topbar/Ellipse 1.svg" alt="Avatar" className="h-[24px] w-[24px] sm:h-[20px] sm:w-[20px] md:h-[36px] md:w-[36px] rounded-full" />
          <span className="text-[12px] sm:text-[10px] md:text-[14px] font-medium text-gray-900 pr-1 sm:pr-3 md:pr-12 truncate">{user?.fullName || user?.name || 'User'}</span>
          <img src="/icons/topbar/Dropdown.svg" alt="Dropdown" className="h-4 w-4 sm:h-2.5 sm:w-2.5 md:h-4 md:w-4" />
        </div>
      </div>
    </div>
  );
}


