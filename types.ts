// Enum for Constellation Types
export enum ConstellationType {
  TRIANGULUM = 'Triangulum', // 3 people
  PLEIADES = 'Pléiades',     // 7 people
}

// Enum for Payment Methods
export enum PaymentMethodType {
  CARD = 'Carte bancaire',
  PAYPAL = 'PayPal',
  BANK_TRANSFER = 'Virement bancaire',
  MOBILE_MONEY = 'Mobile Money (Afrique)',
  CRYPTO = 'Bitcoin/Crypto',
  OTHER = 'Autre',
}

// User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  phone?: string;
  referralCode: string;
  referredBy?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// Constellation Interface
export interface Constellation {
  id: string;
  type: ConstellationType;
  alcyoneId: string; // User ID of the Alcyone (center person)
  alcyoneName: string;
  currentTour: number;
  status: 'active' | 'completed' | 'pending';
  members: ConstellationMember[]; // People supporting this Alcyone
  createdAt: string;
  updatedAt: string;
}

// Constellation Member Interface
export interface ConstellationMember {
  id: string;
  userId: string;
  name: string;
  position: number; // 1 to 3 or 1 to 7
  contributionStatus: 'pending' | 'paid';
  joinedAt: string;
}

// Tour Interface
export interface Tour {
  id: string;
  userId: string;
  tourNumber: number;
  amountPaid: number;
  amountReceived: number;
  amountKept: number;
  status: 'locked' | 'in_progress' | 'complete' | 'waiting_payment';
  completedAt?: string;
  createdAt: string;
}

// Transaction Interface
export interface Transaction {
  id: string;
  userId: string;
  type: 'sent' | 'received' | 'transfer' | 'withdrawal';
  amount: number;
  currency: string;
  status: 'pending' | 'done';
  paymentMethod?: PaymentMethodType;
  gatewayReference?: string;
  date: string; // Use string for simplicity, can be Date object
}

// Referral Interface
export interface Referral {
  id: string;
  referrerId: string;
  refereeId: string;
  refereeName: string;
  bonusEarned: number;
  status: 'pending' | 'active' | 'completed_tour_1';
  joinedAt: string;
}

// Payment Method Details Interface (encrypted in real app)
export interface UserPaymentMethod {
  id: string;
  userId: string;
  type: PaymentMethodType;
  details: string; // e.g., "**** 4242" for card, "FR76 XXXX ****" for bank
  isDefault: boolean;
  createdAt: string;
}

// Admin Stat Interface
export interface AdminStats {
  totalUsers: number;
  totalConstellations: number;
  totalTransactions: number;
  totalEarnings: number;
  recentActivity: AdminActivity[];
  alerts: string[];
}

export interface AdminActivity {
  user: string;
  action: string;
  amount: number;
  time: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  currentTour: string; // e.g., "2/7"
  status: 'Active' | 'Inactive' | 'Suspended';
}

export interface AdminConstellation {
  id: string;
  type: ConstellationType;
  alcyone: string;
  members: string; // e.g., "7/7 Full"
  currentTour: string; // e.g., "4/7"
}

export interface AdminTransaction {
  id: string;
  date: string;
  user: string;
  amount: number;
  status: '✓ Done' | '⏳ Pend';
  action: 'V' | 'A'; // View / Approve
}


// Mock User Data for testing
export const initialUser: User = {
  id: 'user-alex-123',
  name: 'Alex Martin',
  email: 'alex.martin@email.com',
  country: 'France',
  phone: '+33 6 12 34 56 78',
  referralCode: 'AX123',
  referredBy: undefined,
  role: 'user',
  createdAt: '2026-01-01T10:00:00Z',
  updatedAt: '2026-01-09T14:30:00Z',
};

// Mock Admin User Data for testing
export const initialAdminUser: User = {
  id: 'user-admin-456',
  name: 'Admin User',
  email: 'admin@7ensemble.com',
  country: 'Switzerland',
  phone: '+41 79 123 45 67',
  referralCode: 'ADM789',
  referredBy: undefined,
  role: 'admin',
  createdAt: '2025-12-01T08:00:00Z',
  updatedAt: '2026-01-09T15:00:00Z',
};