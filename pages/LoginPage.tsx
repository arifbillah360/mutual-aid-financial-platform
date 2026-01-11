import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../App';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Assuming login sets user role in context
        // Redirect based on role if needed, for this app, App.tsx handles general routing for admin
        navigate('/dashboard');
      } else {
        setError('Email ou mot de passe incorrect.');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-2xl relative z-10">
        <div className="text-center">
          <h2 className="mt-6 text-5xl font-extrabold text-white">
            7 ENSEMBLE
          </h2>
          <p className="mt-2 text-sm text-gray-400">Accédez à votre espace.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email:"
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="alex.martin@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              label="Mot de passe:"
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10" // Add padding to make space for the toggle
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 top-1/2 -translate-y-1/2 flex items-center pr-3 text-gray-400 hover:text-gray-200 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414L5.586 7.5l-3.293 3.293a1 1 0 101.414 1.414L7 8.414l3.293 3.293a1 1 0 001.414-1.414L8.414 7.5l3.293-3.293a1 1 0 10-1.414-1.414L7 6.086 3.707 2.793a1 1 0 00-1.414 1.414zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  <path d="M14.707 15.293a1 1 0 001.414-1.414L10 8.414l-3.293 3.293a1 1 0 001.414 1.414L10 10.828l3.293 3.293z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full text-lg py-3" disabled={isLoading}>
            {isLoading ? 'Connexion en cours...' : '🚀 Se Connecter'}
          </Button>
        </form>

        <div className="text-sm text-center mt-4">
          <a href="#" className="font-medium text-emerald-400 hover:text-emerald-300">
            Mot de passe oublié?
          </a>
        </div>
      </div>
    </div>
  );
};