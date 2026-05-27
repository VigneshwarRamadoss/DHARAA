import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Address {
  id: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  preferredPayment: 'online' | 'cod' | null;
  notifications: {
    orderUpdates: boolean;
    newArrivals: boolean;
    deals: boolean;
  };
}

interface AccountContextType {
  profile: Profile;
  updateProfile: (fields: Partial<Profile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  updatePreferences: (payment: Profile['preferredPayment'], notifications?: Partial<Profile['notifications']>) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const ACCOUNT_KEY = 'dharaa_account';

const defaultProfile: Profile = {
  name: '',
  email: '',
  phone: '',
  addresses: [],
  preferredPayment: null,
  notifications: {
    orderUpdates: true,
    newArrivals: true,
    deals: false
  }
};

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(() => {
    try {
      const stored = localStorage.getItem(ACCOUNT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all fields exist if the user has an old schema
        return { ...defaultProfile, ...parsed, notifications: { ...defaultProfile.notifications, ...(parsed.notifications || {}) } };
      }
      return defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  useEffect(() => {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (fields: Partial<Profile>) => {
    setProfile(current => ({ ...current, ...fields }));
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: Math.random().toString(36).substr(2, 9),
      isDefault: profile.addresses.length === 0 ? true : address.isDefault
    };

    setProfile(current => {
      let updatedAddresses = [...current.addresses, newAddress];
      if (newAddress.isDefault) {
        updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: a.id === newAddress.id }));
      }
      return { ...current, addresses: updatedAddresses };
    });
  };

  const removeAddress = (id: string) => {
    setProfile(current => {
      const updatedAddresses = current.addresses.filter(a => a.id !== id);
      // If we removed the default address and there are others, make the first one default
      if (current.addresses.find(a => a.id === id)?.isDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true;
      }
      return { ...current, addresses: updatedAddresses };
    });
  };

  const setDefaultAddress = (id: string) => {
    setProfile(current => ({
      ...current,
      addresses: current.addresses.map(a => ({ ...a, isDefault: a.id === id }))
    }));
  };

  const updatePreferences = (payment: Profile['preferredPayment'], notifications?: Partial<Profile['notifications']>) => {
    setProfile(current => ({
      ...current,
      preferredPayment: payment !== undefined ? payment : current.preferredPayment,
      notifications: notifications ? { ...current.notifications, ...notifications } : current.notifications
    }));
  };

  return (
    <AccountContext.Provider
      value={{
        profile,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        updatePreferences
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
}
