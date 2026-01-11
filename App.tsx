import React, { useState, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SevenToursPage } from './pages/SevenToursPage';
import { MissionPage } from './pages/MissionPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardLayout } from './pages/Dashboard/DashboardLayout';
import { DashboardOverview } from './pages/Dashboard/DashboardOverview';
import { MyConstellation } from './pages/Dashboard/MyConstellation';
import { TourProgress } from './pages/Dashboard/TourProgress';
import { PaymentHistory } from './pages/Dashboard/PaymentHistory';
import { TransferMoney } from './pages/Dashboard/TransferMoney';
import { ReferralSystem } from './pages/Dashboard/ReferralSystem';
import { SettingsPage } from './pages/Dashboard/SettingsPage';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { UsersManagement } from './pages/Admin/UsersManagement';
import { ConstellationsManagement } from './pages/Admin/ConstellationsManagement';
import { TransactionsManagement } from './pages/Admin/TransactionsManagement';
import { ReportsAnalytics } from './pages/Admin/ReportsAnalytics';
import { Modal } from './components/Modal';
import { RegisterModal } from './components/RegisterModal';
import { Button } from './components/Button';
import { User, initialUser, ConstellationType, PaymentMethodType } from './types'; // Import necessary types

// Auth Context
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterFormData) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface RegisterFormData {
  fullName: string;
  email: string;
  country: string;
  paymentMethod: PaymentMethodType;
  constellationOption: ConstellationType;
  acceptTerms: boolean;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check for a token in localStorage on initial load
    return localStorage.getItem('authToken') !== null;
  });
  const [user, setUser] = useState<User | null>(() => {
    // Simulate fetching user data if token exists
    return localStorage.getItem('authToken') ? initialUser : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'alex.martin@email.com' && password === 'password123') {
          localStorage.setItem('authToken', 'mock-jwt-token');
          setIsAuthenticated(true);
          setUser(initialUser); // Set initial user data upon login
          resolve(true);
        } else if (email === 'admin@7ensemble.com' && password === 'adminpass') {
          localStorage.setItem('authToken', 'mock-admin-token');
          setIsAuthenticated(true);
          setUser({ ...initialUser, role: 'admin' });
          resolve(true);
        }
        resolve(false);
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  const register = async (userData: RegisterFormData): Promise<boolean> => {
    // Simulate API call
    console.log('Registering user:', userData);
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would create the user and return a token/credentials
        // For now, we just simulate success.
        resolve(true);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold text-emerald-400">7 Ensemble</Link>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-emerald-400 transition-colors">Accueil</Link>
          <Link to="/7tours" className="hover:text-emerald-400 transition-colors">7 Tours</Link>
          <Link to="/mission" className="hover:text-emerald-400 transition-colors">Mission</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link>
              <Button onClick={handleLogout} variant="secondary">Déconnexion</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsRegisterModalOpen(true)}>Rejoindre la Révolution</Button>
            </>
          )}
        </nav>
        {/* Mobile menu (hamburger icon) - omitted for brevity, but would be here */}
      </div>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="✨ Rejoindre 7 Ensemble ✨"
        subtitle="Votre aventure commence ici 💖"
      />
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 bg-opacity-90 backdrop-blur-sm shadow-inner mt-12 py-8 text-center text-gray-400">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} 7 Ensemble. All rights reserved.</p>
        <p className="mt-2 text-sm">Built with love and community spirit.</p>
      </div>
    </footer>
  );
};

const PrivateRoute: React.FC<{ children: React.ReactNode; roles?: string[] }> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (roles && user && !roles.includes(user.role)) {
      navigate('/dashboard'); // Redirect if not authorized for admin
    }
  }, [isAuthenticated, user, roles, navigate]);

  if (!isAuthenticated || (roles && user && !roles.includes(user.role))) {
    return null; // Or a loading spinner
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/7tours" element={<SevenToursPage />} />
              <Route path="/mission" element={<MissionPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* User Dashboard Routes (Private) */}
              <Route
                path="/dashboard/*"
                element={
                  <PrivateRoute roles={['user', 'admin']}>
                    <DashboardLayout>
                      <Routes>
                        <Route path="/" element={<DashboardOverview />} />
                        <Route path="/my-constellation" element={<MyConstellation />} />
                        <Route path="/tour-progress" element={<TourProgress />} />
                        <Route path="/payment-history" element={<PaymentHistory />} />
                        <Route path="/transfer-money" element={<TransferMoney />} />
                        <Route path="/referral-system" element={<ReferralSystem />} />
                        <Route path="/settings" element={<SettingsPage />} />
                      </Routes>
                    </DashboardLayout>
                  </PrivateRoute>
                }
              />

              {/* Admin Panel Routes (Private, Admin Only) */}
              <Route
                path="/admin/*"
                element={
                  <PrivateRoute roles={['admin']}>
                    <DashboardLayout isAdmin={true}>
                      <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/users" element={<UsersManagement />} />
                        <Route path="/constellations" element={<ConstellationsManagement />} />
                        <Route path="/transactions" element={<TransactionsManagement />} />
                        <Route path="/reports" element={<ReportsAnalytics />} />
                      </Routes>
                    </DashboardLayout>
                  </PrivateRoute>
                }
              />

              {/* Catch-all for unknown routes */}
              <Route path="*" element={<h1 className="text-center text-4xl mt-20 text-red-500">404 - Page Not Found</h1>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;