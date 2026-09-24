import React, { useState } from 'react';
import { Animal } from '../types';
import { AnimalCard } from './AnimalCard';

export interface AnimalGridProps {
  animals: Animal[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const AnimalGrid: React.FC<AnimalGridProps> = ({ animals, selectedId, onSelect }) => {
  const [filterType, setFilterType] = useState<'all' | 'cat' | 'dog'>('all');

  const filteredAnimals = animals.filter((animal) => {
    if (filterType === 'all') return true;
    return animal.type === filterType;
  });

  const catCount = animals.filter(a => a.type === 'cat').length;
  const dogCount = animals.filter(a => a.type === 'dog').length;

  return (
    <div className="space-y-6">
      {/* Category filter tabs */}
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            filterType === 'all'
              ? 'bg-orange-500 text-white shadow-sm shadow-orange-200 scale-105'
              : 'bg-white text-stone-600 hover:bg-orange-50/60 border border-stone-200/70'
          }`}
        >
          Tất cả ({animals.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('cat')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            filterType === 'cat'
              ? 'bg-orange-500 text-white shadow-sm shadow-orange-200 scale-105'
              : 'bg-white text-stone-600 hover:bg-orange-50/60 border border-stone-200/70'
          }`}
        >
          Mèo cưng ({catCount})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('dog')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            filterType === 'dog'
              ? 'bg-orange-500 text-white shadow-sm shadow-orange-200 scale-105'
              : 'bg-white text-stone-600 hover:bg-orange-50/60 border border-stone-200/70'
          }`}
        >
          Cún con ({dogCount})
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredAnimals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            isSelected={selectedId === animal.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};
