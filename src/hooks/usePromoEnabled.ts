import { useState, useEffect } from 'react';

const PROMO_STORAGE_KEY = 'promoEnabled';
const PROMO_CHANGE_EVENT = 'promoStateChange';

type PromoChangeEvent = CustomEvent<boolean>;

export const usePromoEnabled = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(PROMO_STORAGE_KEY);
      return savedState ? JSON.parse(savedState) : false;
    }
    return false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem(PROMO_STORAGE_KEY);
      const storedValue = savedState ? JSON.parse(savedState) : false;
      setIsEnabled(storedValue);
    };

    const handleCustomEvent = (e: PromoChangeEvent) => {
      setIsEnabled(e.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(PROMO_CHANGE_EVENT, handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(PROMO_CHANGE_EVENT, handleCustomEvent as EventListener);
    };
  }, []);

  const togglePromoEnabled = (enabled: boolean) => {
    setIsEnabled(enabled);
    localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(enabled));
    window.dispatchEvent(new CustomEvent(PROMO_CHANGE_EVENT, { detail: enabled }));
  };

  return {
    isEnabled,
    togglePromoEnabled
  };
}; 
