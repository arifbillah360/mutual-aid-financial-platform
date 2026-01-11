import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Checkbox } from '../../components/Checkbox';
import { Select } from '../../components/Select';
import { useAuth } from '../../App';
import { User, UserPaymentMethod, PaymentMethodType } from '../../types';
import { COUNTRIES, PAYMENT_METHODS } from '../../constants';

// Mock Data
const mockCurrentUser: User = {
  id: 'user-alex-123',
  name: 'Alex Martin',
  email: 'alex.martin@email.com',
  country: 'France',
  phone: '+33 6 12 34 56 78',
  referralCode: 'AX123',
  role: 'user',
  createdAt: '2026-01-01T10:00:00Z',
  updatedAt: '2026-01-09T14:30:00Z',
};

const mockPaymentMethods: UserPaymentMethod[] = [
  { id: 'pm1', userId: 'user-alex-123', type: PaymentMethodType.CARD, details: '💳 **** 4242', isDefault: true, createdAt: '2026-01-09' },
  { id: 'pm2', userId: 'user-alex-123', type: PaymentMethodType.BANK_TRANSFER, details: '🏦 FR76 XXXX ****', isDefault: false, createdAt: '2026-01-10' },
];

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Personal Info State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [infoUpdateError, setInfoUpdateError] = useState('');
  const [infoUpdateSuccess, setInfoUpdateSuccess] = useState('');

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

  // Payment Methods State
  const [userPaymentMethods, setUserPaymentMethods] = useState<UserPaymentMethod[]>([]);
  const [newPaymentMethodType, setNewPaymentMethodType] = useState<PaymentMethodType>(PaymentMethodType.CARD);
  const [newPaymentMethodDetails, setNewPaymentMethodDetails] = useState('');
  const [addPaymentError, setAddPaymentError] = useState('');

  // Notifications State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [tourCompletion, setTourCompletion] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      // Simulate fetching user data and settings
      setTimeout(() => {
        setName(mockCurrentUser.name);
        setEmail(mockCurrentUser.email);
        setPhone(mockCurrentUser.phone || '');
        setCountry(mockCurrentUser.country);
        setUserPaymentMethods(mockPaymentMethods);
        // Assume default notification settings for mock
        setLoading(false);
      }, 500);
    }
  }, [user]);

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoUpdateError('');
    setInfoUpdateSuccess('');
    // Basic validation
    if (!name || !email || !country) {
      setInfoUpdateError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    // Simulate API call
    console.log('Updating info:', { name, email, phone, country });
    await new Promise(resolve => setTimeout(resolve, 1000));
    setInfoUpdateSuccess('Informations mises à jour avec succès !');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeSuccess('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordChangeError('Veuillez remplir tous les champs de mot de passe.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordChangeError('Le nouveau mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordChangeError('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }
    // Simulate API call
    console.log('Changing password...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPasswordChangeSuccess('Mot de passe changé avec succès !');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAddPaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddPaymentError('');
    if (!newPaymentMethodDetails) {
      setAddPaymentError('Veuillez entrer les détails de paiement.');
      return;
    }
    // Simulate API call
    console.log('Adding payment method:', { newPaymentMethodType, newPaymentMethodDetails });
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserPaymentMethods(prev => [
      ...prev,
      {
        id: `pm${prev.length + 1}`,
        userId: user!.id,
        type: newPaymentMethodType,
        details: newPaymentMethodDetails,
        isDefault: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewPaymentMethodDetails('');
    setAddPaymentError('Méthode de paiement ajoutée avec succès !'); // Re-use error state for success
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible.')) {
      // Simulate API call for account deletion
      alert('Suppression du compte simulée.');
      console.log('Deleting account...');
      // In a real app, log out and redirect to home/login
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-xl">Chargement des paramètres...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">Paramètres</h1>

      {/* Personal Information */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">Informations Personnelles</h2>
        <form onSubmit={handleUpdateInfo} className="space-y-6">
          <Input label="Nom:" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Email:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Téléphone:" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Select
            label="Pays:"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={COUNTRIES.map(c => ({ value: c, label: c }))}
            required
          />
          {infoUpdateError && <p className="text-red-500 text-sm">{infoUpdateError}</p>}
          {infoUpdateSuccess && <p className="text-green-500 text-sm">{infoUpdateSuccess}</p>}
          <Button type="submit" className="w-full">Mettre à jour les informations</Button>
        </form>
      </section>

      {/* Security */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">Sécurité</h2>
        <form onSubmit={handleChangePassword} className="space-y-6">
          <Input label="Mot de passe actuel:" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
          <Input label="Nouveau mot de passe:" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <Input label="Confirmer le nouveau mot de passe:" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          {passwordChangeError && <p className="text-red-500 text-sm">{passwordChangeError}</p>}
          {passwordChangeSuccess && <p className="text-green-500 text-sm">{passwordChangeSuccess}</p>}
          <Button type="submit" className="w-full">Changer le mot de passe</Button>
        </form>
      </section>

      {/* Payment Methods */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">Méthodes de Paiement</h2>
        <div className="space-y-4 mb-8">
          {userPaymentMethods.length === 0 ? (
            <p className="text-gray-400">Aucune méthode de paiement enregistrée.</p>
          ) : (
            userPaymentMethods.map(pm => (
              <div key={pm.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-md">
                <span className="text-gray-200">{pm.details} {pm.isDefault && <span className="text-xs text-emerald-400">(Par défaut)</span>}</span>
                <Button variant="danger" size="sm" onClick={() => alert(`Suppression de ${pm.details} simulée`)}>Supprimer</Button>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleAddPaymentMethod} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">Ajouter une Méthode de Paiement</h3>
          <Select
            label="Type de méthode:"
            value={newPaymentMethodType}
            onChange={(e) => setNewPaymentMethodType(e.target.value as PaymentMethodType)}
            options={PAYMENT_METHODS.map(pm => ({ value: pm, label: pm }))}
          />
          <Input label="Détails (ex: **** 4242 ou FR76 XXXX ****):" type="text" value={newPaymentMethodDetails} onChange={(e) => setNewPaymentMethodDetails(e.target.value)} required />
          {addPaymentError && <p className="text-red-500 text-sm">{addPaymentError}</p>}
          <Button type="submit" className="w-full">
            + Ajouter Méthode de Paiement
          </Button>
        </form>
      </section>

      {/* Notifications */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">Notifications</h2>
        <div className="space-y-4">
          <Checkbox label="Notifications par e-mail" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
          <Checkbox label="Alertes de paiement" checked={paymentAlerts} onChange={(e) => setPaymentAlerts(e.target.checked)} />
          <Checkbox label="Achèvement du tour" checked={tourCompletion} onChange={(e) => setTourCompletion(e.target.checked)} />
          <Checkbox label="E-mails marketing" checked={marketingEmails} onChange={(e) => setMarketingEmails(e.target.checked)} />
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-900 bg-opacity-30 p-8 rounded-lg shadow-xl border border-red-700">
        <h2 className="text-3xl font-bold text-red-400 mb-6">Zone de Danger</h2>
        <Button onClick={handleDeleteAccount} variant="danger" className="w-full">
          Supprimer le Compte
        </Button>
        <p className="text-red-300 text-sm mt-4 text-center">Cette action est irréversible.</p>
      </section>
    </div>
  );
};