import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { RadioButton } from './RadioButton';
import { ConstellationType, PaymentMethodType } from '../types';
import { COUNTRIES, PAYMENT_METHODS, CONSTELLATION_OPTIONS } from '../constants';
import { useAuth } from '../App'; // Import useAuth from App

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, title, subtitle }) => {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(PaymentMethodType.CARD);
  const [constellationOption, setConstellationOption] = useState<ConstellationType>(
    ConstellationType.PLEIADES
  );
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName) newErrors.fullName = 'Le nom complet est requis.';
    if (!email) {
      newErrors.email = 'L\'email est requis.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'L\'email n\'est pas valide.';
    }
    if (!acceptTerms) newErrors.acceptTerms = 'Vous devez accepter les termes.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});
    try {
      const success = await register({
        fullName,
        email,
        country,
        paymentMethod,
        constellationOption,
        acceptTerms,
      });
      if (success) {
        setSubmissionSuccess(true);
        // Clear form after successful submission
        setFullName('');
        setEmail('');
        setCountry(COUNTRIES[0]);
        setPaymentMethod(PaymentMethodType.CARD);
        setConstellationOption(ConstellationType.PLEIADES);
        setAcceptTerms(false);
      } else {
        setErrors({ general: 'Échec de l\'inscription. Veuillez réessayer.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSubmissionSuccess(false); // Reset success state when closing
    setErrors({}); // Clear errors when closing
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      {submissionSuccess ? (
        <div className="text-center py-8">
          <p className="text-3xl mb-4">🚀 Inscription Réussie !</p>
          <p className="text-lg text-gray-300">Bienvenue dans la Révolution 7 Ensemble !</p>
          <p className="text-base text-gray-400 mt-2">Vérifiez votre email pour les détails de connexion.</p>
          <Button onClick={handleClose} className="mt-6">Fermer</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nom complet:"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
            required
          />
          <Input
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />
          <Select
            label="Pays:"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={COUNTRIES.map(c => ({ value: c, label: c }))}
          />
          <Select
            label="Mode de paiement:"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethodType)}
            options={PAYMENT_METHODS.map(pm => ({ value: pm, label: pm }))}
          />

          <div>
            <p className="text-lg font-semibold text-emerald-400 mb-3">✨ Choisissez votre option ✨</p>
            {CONSTELLATION_OPTIONS.map(option => (
              <RadioButton
                key={option.value}
                name="constellationOption"
                value={option.value}
                label={option.label}
                checked={constellationOption === option.value}
                onChange={(e) => setConstellationOption(e.target.value as ConstellationType)}
                className="mb-2"
              />
            ))}
          </div>

          <Checkbox
            label="J'accepte le système d'entraide"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            error={errors.acceptTerms}
            required
          />

          {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

          <Button type="submit" className="w-full text-lg py-3" disabled={isLoading}>
            {isLoading ? 'Inscription en cours...' : '🚀 Créer Ma Constellation!'}
          </Button>

          <p className="text-center text-gray-400 text-sm mt-4">{subtitle}</p>
        </form>
      )}
    </Modal>
  );
};