import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/choose', label: 'Gửi yêu thương' },
    { to: '/station', label: 'Trạm Yêu Thương' },
    { to: '/scenarios', label: 'Cứu hộ cơ bản' },
    { to: '/rescue-centers', label: 'Nơi hỗ trợ' },
    { to: '/project', label: 'Về SSG105' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-orange-100/70 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-400 to-amber-400 flex items-center justify-center text-white shadow-sm shadow-orange-200 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="font-extrabold text-xl tracking-tight text-stone-800 flex items-center gap-1.5">
              Trạm Yêu Thương
              <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                SSG105
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium">Hành trình bảo vệ chó mèo bỏ rơi</p>
          </div>
        </Link>

        {/* Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-200'
                    : 'text-stone-600 hover:text-orange-600 hover:bg-orange-50/80'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
