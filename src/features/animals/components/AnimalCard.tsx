import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Animal } from '../types';

export interface AnimalCardProps {
  animal: Animal;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal, isSelected, onSelect }) => {
  const isCat = animal.type === 'cat';

  return (
    <button
      type="button"
      onClick={() => onSelect(animal.id)}
      aria-pressed={isSelected}
      className={`group relative w-full text-left rounded-3xl p-4 sm:p-5 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 ${
        isSelected
          ? 'bg-gradient-to-b from-orange-50/90 to-amber-50/90 border-2 border-orange-400 shadow-cute-hover scale-[1.02] -translate-y-1'
          : 'bg-white hover:bg-orange-50/30 border border-stone-200/70 hover:border-orange-200 shadow-sm hover:shadow-cute hover:-translate-y-0.5'
      }`}
    >
      {/* Selected check badge */}
      {isSelected && (
        <div className="absolute top-3.5 right-3.5 z-10 w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-300/50 animate-in fade-in zoom-in duration-200">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
      )}

      {/* Image container */}
      <div className={`w-full aspect-square rounded-2xl flex items-center justify-center p-3 mb-3.5 transition-colors overflow-hidden ${
        isSelected ? 'bg-orange-100/60' : 'bg-warm-bg group-hover:bg-orange-50/80'
      }`}>
        <img
          src={animal.asset}
          alt={animal.alt}
          loading="lazy"
          className={`w-full h-full object-contain transition-transform duration-300 ${
            isSelected ? 'scale-105' : 'group-hover:scale-105'
          }`}
        />
      </div>

      {/* Metadata & Labels */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-extrabold text-base sm:text-lg text-stone-800 tracking-tight group-hover:text-orange-600 transition-colors">
            {animal.displayName || (isCat ? 'Bé Mèo' : 'Bé Cún')}
          </h3>
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              isCat
                ? 'bg-amber-100 text-amber-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {isCat ? 'Mèo' : 'Chó'}
          </span>
        </div>

        {animal.personality && (
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {animal.personality}
          </p>
        )}
      </div>

      {/* Subtle selection prompt indicator */}
      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
        <span className={isSelected ? 'text-orange-600 flex items-center gap-1 font-bold' : 'text-stone-400 group-hover:text-stone-600'}>
          {isSelected ? (
            <>
              <Sparkles className="w-3.5 h-3.5 fill-orange-400 text-orange-500" />
              Đã chọn bạn này
            </>
          ) : (
            'Nhấn để chọn'
          )}
        </span>
      </div>
    </button>
  );
};
