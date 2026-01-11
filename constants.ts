import { ConstellationType, PaymentMethodType } from './types';

// Navigation Links
export const NAV_LINKS = [
  { name: 'Accueil', path: '/' },
  { name: '7 Tours', path: '/7tours' },
  { name: 'Mission', path: '/mission' },
];

// Tour Details for Triangulum (3 People Option)
export const TRIANGULUM_TOURS = [
  { tour: 1, offert: 21, recu: 63, avoir: 0, nextPay: 63, total: 7789 },
  { tour: 2, offert: 63, recu: 189, avoir: 89, nextPay: 100 },
  { tour: 3, offert: 100, recu: 300, avoir: 100, nextPay: 200 },
  { tour: 4, offert: 200, recu: 600, avoir: 100, nextPay: 500 },
  { tour: 5, offert: 500, recu: 1500, avoir: 500, nextPay: 1000 },
  { tour: 6, offert: 1000, recu: 3000, avoir: 1000, nextPay: 2000 },
  { tour: 7, offert: 2000, recu: 6000, avoir: 6000, nextPay: 0 },
];

// Tour Details for Pléiades (7 People Option)
export const PLEIADES_TOURS = [
  { tour: 1, offert: 21, recu: 147, avoir: 47, nextPay: 100, total: 1575747 },
  { tour: 2, offert: 100, recu: 700, avoir: 200, nextPay: 500 },
  { tour: 3, offert: 500, recu: 3500, avoir: 1500, nextPay: 2000 },
  { tour: 4, offert: 2000, recu: 14000, avoir: 4000, nextPay: 10000 },
  { tour: 5, offert: 10000, recu: 70000, avoir: 20000, nextPay: 50000 },
  { tour: 6, offert: 50000, recu: 350000, avoir: 150000, nextPay: 200000 },
  { tour: 7, offert: 200000, recu: 1400000, avoir: 1400000, nextPay: 0 },
];

// Mission Goals
export const MISSION_GOALS = [
  { icon: '🏠', text: 'Familles Heureuses', color: 'bg-red-500' },
  { icon: '👴', text: 'Retraités Dignes', color: 'bg-orange-500' },
  { icon: '💖', text: 'Accès à la Santé', color: 'bg-yellow-500' },
  { icon: '🌟', text: 'Rêves Réalisés', color: 'bg-emerald-500' },
  { icon: '🧸', text: 'Avenir pour Enfants', color: 'bg-teal-500' },
  { icon: '🤝', text: 'Entraide Mondiale', color: 'bg-blue-500' },
  { icon: '🍽️', text: 'Manger Pour TOUS', color: 'bg-purple-500' },
];

// Countries for Registration Form
export const COUNTRIES = [
  'France',
  'Suisse',
  'Belgique',
  'Canada',
  'Maroc',
  'Tunisie',
  'Sénégal',
  'Côte d\'Ivoire',
  'Inde',
  'Autre',
];

// Payment Methods for Registration Form
export const PAYMENT_METHODS = [
  PaymentMethodType.CARD,
  PaymentMethodType.PAYPAL,
  PaymentMethodType.BANK_TRANSFER,
  PaymentMethodType.MOBILE_MONEY,
  PaymentMethodType.CRYPTO,
  PaymentMethodType.OTHER,
];

// Constellation Options for Registration Form
export const CONSTELLATION_OPTIONS = [
  {
    type: ConstellationType.TRIANGULUM,
    label: `Option 3 personnes → ${TRIANGULUM_TOURS[0].total.toLocaleString('fr-FR')}€`,
    value: ConstellationType.TRIANGULUM,
  },
  {
    type: ConstellationType.PLEIADES,
    label: `Option 7 personnes → ${PLEIADES_TOURS[0].total.toLocaleString('fr-FR')}€`,
    value: ConstellationType.PLEIADES,
  },
];

// Dashboard Sidebar Links
export const DASHBOARD_LINKS = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'My Constellation', path: '/dashboard/my-constellation' },
  { name: 'Tour Progress', path: '/dashboard/tour-progress' },
  { name: 'Payment History', path: '/dashboard/payment-history' },
  { name: 'Transfer Money', path: '/dashboard/transfer-money' },
  { name: 'Referral System', path: '/dashboard/referral-system' },
  { name: 'Support', path: '/dashboard/support' }, // Not explicitly detailed in features but common
  { name: 'Settings', path: '/dashboard/settings' },
];

export const ADMIN_LINKS = [
  { name: 'Dashboard', path: '/admin' },
  { name: 'Users', path: '/admin/users' },
  { name: 'Constellations', path: '/admin/constellations' },
  { name: 'Transactions', path: '/admin/transactions' },
  { name: 'Reports', path: '/admin/reports' },
  { name: 'Settings', path: '/admin/settings' }, // Not explicitly detailed for admin but standard
];