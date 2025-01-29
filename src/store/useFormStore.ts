import { create } from 'zustand';

type City = {
    id: string;
    name: string;
    country: string;
  } 

type FormState = {
  fromCity: City | undefined;
  toCity: City | undefined;
  passengerCount: number;
  selectedClass: 'economy' | 'business';
  isModalOpen: boolean;
  modalContent: {
    title: string;
    message: string;
  };
  setFromCity: (city: City | undefined) => void;
  setToCity: (city: City | undefined) => void;
  setPassengerCount: (count: number) => void;
  setSelectedClass: (classType: 'economy' | 'business') => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalContent: (content: { title: string; message: string }) => void;
}

export const useFormStore = create<FormState>((set) => ({
  fromCity: undefined,
  toCity: undefined,
  passengerCount: 1,
  selectedClass: 'economy',
  isModalOpen: false,
  modalContent: {
    title: '',
    message: '',
  },
  setFromCity: (city) => set({ fromCity: city }),
  setToCity: (city) => set({ toCity: city }),
  setPassengerCount: (count) => set({ passengerCount: count }),
  setSelectedClass: (classType) => set({ selectedClass: classType }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setModalContent: (content) => set({ modalContent: content }),
}));