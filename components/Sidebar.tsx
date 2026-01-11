import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from '../App';
import { DASHBOARD_LINKS, ADMIN_LINKS } from '../constants';

interface SidebarProps {
  isAdmin?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isAdmin = false }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const links = isAdmin ? ADMIN_LINKS : DASHBOARD_LINKS;

  return (
    <aside className="w-full md:w-64 bg-gray-800 p-6 flex flex-col justify-between shadow-lg h-full md:min-h-screen">
      <div>
        <h2 className="text-3xl font-bold text-emerald-400 mb-8 hidden md:block">
          {isAdmin ? 'Admin Panel' : 'Dashboard'}
        </h2>
        <nav className="space-y-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-emerald-400 transition-colors duration-200
                ${isActive ? 'bg-emerald-700 bg-opacity-30 text-emerald-300' : ''}`
              }
            >
              <span className="text-lg font-medium">{link.name}</span>
            </NavLink>
          ))}
          {/* Support link for user dashboard only */}
          {!isAdmin && user?.role === 'user' && (
             <NavLink
             to="/dashboard/support"
             className={({ isActive }) =>
               `flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-emerald-400 transition-colors duration-200
               ${isActive ? 'bg-emerald-700 bg-opacity-30 text-emerald-300' : ''}`
             }
           >
             <span className="text-lg font-medium">Support</span>
           </NavLink>
          )}
        </nav>
      </div>
      <div className="mt-8">
        <Button onClick={handleLogout} variant="secondary" className="w-full">
          Déconnexion
        </Button>
      </div>
    </aside>
  );
};