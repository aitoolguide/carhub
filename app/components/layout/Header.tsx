// Updated Header Component with NextAuth Integration
// Replace the existing Header component with this

'use client';

import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  Search,
  User,
  Heart,
  Bell,
  Globe,
  ChevronDown,
  Menu,
  X,
  LogOut,
  Settings,
  MessageSquare,
  Package,
  LayoutGrid,
  Car,
  Users
} from 'lucide-react';

const Header = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = !!session?.user;

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'AR', name: 'العربية' },
    { code: 'UR', name: 'اردو' }
  ];

  const navigationCategories = [
    { name: 'Motors', icon: Car, isNew: true, href: '/motors' },
    { name: 'Property', icon: LayoutGrid, isNew: true, href: '/property' },
    { name: 'Jobs', icon: Users, href: '/jobs' },
    { name: 'Classifieds', icon: LayoutGrid, href: '/classifieds' },
    { name: 'Furniture & Garden', icon: LayoutGrid, href: '/furniture-garden' },
    { name: 'Mobiles & Tablets', icon: LayoutGrid, href: '/mobiles-tablets' },
    { name: 'Community', icon: Users, href: '/community' }
  ];

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleSignIn = () => {
    signIn();
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Header Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center transform -rotate-12">
                    <Car size={24} className="text-white transform rotate-12" />
                  </div>
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900">CarHub</span>
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <span>Dubai</span>
                    <ChevronDown size={12} />
                  </div>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Icons */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Notifications */}
              <a href="/notifications" className="flex flex-col items-center px-4 py-2 text-gray-600 hover:text-red-600 transition-colors group">
                <div className="relative">
                  <Bell size={22} />
                  {isAuthenticated && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-semibold">
                      3
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">Notifications</span>
              </a>

              {/* My Searches */}
              <a href="/my-searches" className="flex flex-col items-center px-4 py-2 text-gray-600 hover:text-red-600 transition-colors group">
                <Search size={22} />
                <span className="text-xs mt-1 font-medium">My Searches</span>
              </a>

              {/* Favorites */}
              <a href="/favorites" className="flex flex-col items-center px-4 py-2 text-gray-600 hover:text-red-600 transition-colors group">
                <Heart size={22} />
                <span className="text-xs mt-1 font-medium">Favorites</span>
              </a>

              {/* Chats */}
              <a href="/chats" className="flex flex-col items-center px-4 py-2 text-gray-600 hover:text-red-600 transition-colors group">
                <MessageSquare size={22} />
                <span className="text-xs mt-1 font-medium">Chats</span>
              </a>

              {/* My Ads */}
              <a href="/my-ads" className="flex flex-col items-center px-4 py-2 text-gray-600 hover:text-red-600 transition-colors group">
                <LayoutGrid size={22} />
                <span className="text-xs mt-1 font-medium">My Ads</span>
              </a>

              {/* Divider */}
              <div className="h-10 w-px bg-gray-300 mx-3"></div>

              {/* User Menu or Auth Link */}
              {isLoading ? (
                <div className="px-4 py-2">
                  <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center overflow-hidden">
                      {session.user?.image ? (
                        <img 
                          src={session.user.image} 
                          alt={session.user.name || 'User'} 
                          className="w-9 h-9 rounded-full object-cover"
                        />
                      ) : (
                        <User size={20} className="text-red-600" />
                      )}
                    </div>
                    <ChevronDown size={16} />
                  </button>
                  
                  {isUserMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsUserMenuOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {session.user?.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {session.user?.email || ''}
                          </p>
                        </div>
                        <a href="/profile" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <User size={16} />
                          <span>My Profile</span>
                        </a>
                        <a href="/my-ads" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Package size={16} />
                          <span>My Ads</span>
                        </a>
                        <a href="/favorites" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Heart size={16} />
                          <span>Favorites</span>
                        </a>
                        <a href="/settings" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Settings size={16} />
                          <span>Settings</span>
                        </a>
                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <button 
                            onClick={handleSignOut}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full"
                          >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button 
                  onClick={handleSignIn}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap"
                >
                  Log in or sign up
                </button>
              )}

              {/* Place Your Ad Button */}
              <a href="/post-ad" className="ml-2 px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded hover:bg-red-700 transition-colors whitespace-nowrap shadow-sm">
                Place Your Ad
              </a>

              {/* Language Selector */}
              <div className="relative ml-2">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <Globe size={20} />
                  <span className="text-sm font-medium">{currentLang}</span>
                  <ChevronDown size={14} />
                </button>
                {isLangMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsLangMenuOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code);
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                            currentLang === lang.code ? 'text-red-600 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Categories Bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 h-14 overflow-x-auto scrollbar-hide">
            {navigationCategories.map((category, index) => (
              <a
                key={index}
                href={category.href}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 whitespace-nowrap transition-colors font-medium text-sm group"
              >
                <span>{category.name}</span>
                {category.isNew && (
                  <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded uppercase">
                    NEW
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Categories */}
            <div className="space-y-2 pb-4 border-b border-gray-200">
              {navigationCategories.map((category, index) => (
                <a
                  key={index}
                  href={category.href}
                  className="flex items-center justify-between py-2 text-gray-700 hover:text-red-600"
                >
                  <span className="text-sm font-medium">{category.name}</span>
                  {category.isNew && (
                    <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded uppercase">
                      NEW
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Mobile User Section */}
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center overflow-hidden">
                    {session.user?.image ? (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name || 'User'} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {session.user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session.user?.email || ''}
                    </p>
                  </div>
                </div>
                <a href="/my-ads" className="flex items-center space-x-3 py-2 text-gray-700">
                  <LayoutGrid size={18} />
                  <span className="text-sm">My Ads</span>
                </a>
                <a href="/messages" className="flex items-center space-x-3 py-2 text-gray-700">
                  <MessageSquare size={18} />
                  <span className="text-sm">Messages</span>
                </a>
                <a href="/favorites" className="flex items-center space-x-3 py-2 text-gray-700">
                  <Heart size={18} />
                  <span className="text-sm">Favorites</span>
                </a>
                <a href="/my-searches" className="flex items-center space-x-3 py-2 text-gray-700">
                  <Search size={18} />
                  <span className="text-sm">My Searches</span>
                </a>
                <a href="/notifications" className="flex items-center space-x-3 py-2 text-gray-700">
                  <Bell size={18} />
                  <span className="text-sm">Notifications</span>
                </a>
                <a href="/settings" className="flex items-center space-x-3 py-2 text-gray-700">
                  <Settings size={18} />
                  <span className="text-sm">Settings</span>
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                <button 
                  onClick={handleSignIn}
                  className="block w-full py-3 text-center text-sm font-semibold text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50"
                >
                  Log in or sign up
                </button>
              </div>
            )}

            {/* Mobile Post Ad */}
            <a href="/post-ad" className="block w-full py-3 text-center bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
              Place Your Ad
            </a>

            {/* Mobile Language Selector */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-gray-700">Language</span>
                <select
                  value={currentLang}
                  onChange={(e) => setCurrentLang(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-3 py-1.5"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Sign Out */}
            {isAuthenticated && (
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center justify-center space-x-2 py-2 text-red-600 border-t border-gray-200 mt-3 pt-3"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;