import React, { createContext, useContext, useState } from 'react';
import { Animal } from '../features/animals/types';

interface JourneyContextType {
  selectedAnimal: Animal | null;
  setSelectedAnimal: (animal: Animal | null) => void;
  clearJourney: () => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

const STORAGE_KEY = 'ssg105_selected_animal';

export const JourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedAnimal, setSelectedAnimalState] = useState<Animal | null>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const setSelectedAnimal = (animal: Animal | null) => {
    setSelectedAnimalState(animal);
    try {
      if (animal) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(animal));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  };

  const clearJourney = () => {
    setSelectedAnimalState(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <JourneyContext.Provider value={{ selectedAnimal, setSelectedAnimal, clearJourney }}>
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = (): JourneyContextType => {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
};
