import { useState, useEffect } from 'react';
import flightsData from '../db/flights.json';

export type Flight = {
  originAirport: {
    name: string;
    code: string;
    city: {
      code: string;
      name: string;
    };
  };
  destinationAirport: {
    name: string;
    code: string;
    city: {
      code: string;
      name: string;
    };
  };
  arrivalDateTimeDisplay: string;
  departureDateTimeDisplay: string;
  flightDuration: string;
  fareCategories: {
    [key: string]: {
      subcategories: Array<{
        brandCode: string;
        price: {
          amount: number;
          currency: string;
        };
        status: string;
        rights: string[];
      }>;
    };
  };
};

export const useFlights = (from?: string, to?: string) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFlights = async () => {
      if (!from || !to) return;

      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredFlights = flightsData.flights.filter(
        ({ originAirport, destinationAirport }) =>
          originAirport.city.code === from && destinationAirport.city.code === to
      );
      
      setFlights(filteredFlights);
      setLoading(false);
    };

    getFlights();
  }, [from, to]);

  return { flights, loading };
}; 
