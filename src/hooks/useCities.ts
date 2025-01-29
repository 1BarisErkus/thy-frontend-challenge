import { useState, useEffect } from 'react';
import citiesData from '../db/cities.json';

export type City = {
  id: string;
  name: string;
  country: string;
};

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    setCities(citiesData.cities);
  }, []);

  return cities;
}; 
