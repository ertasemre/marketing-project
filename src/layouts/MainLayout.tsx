import { Outlet, Link, useLocation, useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  ChartBarIcon, 
  LinkIcon, 
  UserIcon, 
  PhotoIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  ChartPieIcon,
  SparklesIcon,
  UserGroupIcon,
  CubeIcon,
  MagnifyingGlassCircleIcon,
  HomeIcon,
  CogIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  // Mobil görünümde sidebar kapanması için
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { to: '/dashboard', text: 'Kontrol Paneli', icon: HomeIcon },
    { to: '/analytics', text: 'Analitik', icon: ChartBarIcon },
    { to: '/insights', text: 'İçgörüler', icon: SparklesIcon },
    { to: '/audience-builder', text: 'Hedef Kitle', icon: UserGroupIcon },
    { to: '/tag-assistant', text: 'Tag Assistant', icon: TagIcon },
    { to: '/creatives-audience', text: 'Kreatif & Kitle', icon: SparklesIcon },
    { to: '/integrations', text: 'Entegrasyonlar', icon: LinkIcon },
    { to: '/seo-audit', text: 'SEO Denetimi', icon: MagnifyingGlassIcon },
    { to: '/account-link', text: 'Hesap Bağlantıları', icon: CogIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
        
        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-soft-xl transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="absolute top-5 right-5">
            <button
              type="button"
              className="flex items-center justify-center h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Menüyü Kapat</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-shrink-0 py-6 px-5 flex items-center border-b border-gray-100">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 text-transparent bg-clip-text">MarketingAI</span>
            </div>
            
            <div className="flex-1 py-5 px-5 overflow-y-auto">
              <nav className="space-y-2">
                <ul className="list-none m-0 p-0">
                  {menuItems.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center p-3 rounded-lg ${
                            isActive 
                              ? 'bg-primary-50 text-primary-700' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`
                        }
                      >
                        <item.icon 
                          className={`h-5 w-5 ${
                            location.pathname === item.to ? 'text-primary-700' : 'text-gray-500'
                          }`}
                        />
                        <span className="ml-3 text-sm font-medium">{item.text}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            
            <div className="flex-shrink-0 p-5 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="font-medium">Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:flex-col md:w-64 md:border-r md:border-gray-200 md:bg-white">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-shrink-0 py-6 px-5 flex items-center border-b border-gray-100">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 text-transparent bg-clip-text">MarketingAI</span>
          </div>
          
          <div className="flex-1 py-5 px-4 overflow-y-auto">
            <nav className="space-y-2">
              <ul className="list-none m-0 p-0">
                {menuItems.map((item, idx) => (
                  <li key={idx} className="mb-1">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg ${
                          isActive 
                            ? 'bg-primary-50 text-primary-700' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`
                      }
                    >
                      <item.icon 
                        className={`h-5 w-5 ${
                          location.pathname === item.to ? 'text-primary-700' : 'text-gray-500'
                        }`}
                      />
                      <span className="ml-3 text-sm font-medium">{item.text}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div className="flex-shrink-0 p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400 mr-3" />
              <span className="font-medium text-sm">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="sticky top-0 z-20 flex items-center h-16 bg-white shadow-soft-sm">
          <div className="px-4 sm:px-6 md:px-8 flex justify-between w-full">
            {/* Left side - Mobile menu button & Search */}
            <div className="flex items-center">
              <button
                type="button"
                className="md:hidden -ml-1 flex items-center justify-center h-10 w-10 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Menüyü Aç</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              
              <div className="relative ml-4 md:ml-0">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="search"
                  placeholder="Ara..."
                  className="py-2 pl-10 pr-3 block w-full rounded-lg border border-gray-200 text-sm placeholder:text-gray-400 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
            
            {/* Right side - User menu & notifications */}
            <div className="flex items-center space-x-4">
              <button 
                type="button" 
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <span className="sr-only">Bildirimler</span>
                <div className="relative">
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary-500 flex items-center justify-center text-2xs font-medium text-white">3</span>
                </div>
              </button>
              
              <button 
                type="button" 
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <span className="sr-only">Ayarlar</span>
                <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              
              <div className="border-l border-gray-200 h-6 mx-2"></div>
              
              <button className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                  EM
                </div>
              </button>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 