import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { AnimalGrid } from '../features/animals/components/AnimalGrid';
import { ANIMALS } from '../features/animals/data/animals';
import { useJourney } from '../context/JourneyContext';

export const ChooseAnimalPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedAnimal, setSelectedAnimal } = useJourney();

  // Local state for immediate responsiveness, initialized with context if available
  const [selectedId, setSelectedId] = useState<string | null>(selectedAnimal?.id || null);

  const handleSelectAnimal = (id: string) => {
    setSelectedId(id);
  };

  const handleContinue = () => {
    if (!selectedId) return;
    const chosen = ANIMALS.find((a) => a.id === selectedId) || null;
    if (chosen) {
      setSelectedAnimal(chosen);
      navigate('/wish');
    }
  };

  const currentChosenAnimal = ANIMALS.find((a) => a.id === selectedId);

  return (
    <div className="min-h-screen flex flex-col bg-warm-bg text-warm-text">
      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <PageContainer>
          {/* Header section with step indicator */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Bước 1: Chọn bạn đồng hành
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-800 tracking-tight mb-3">
              Chọn một bạn nhỏ bạn yêu mến
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              Mỗi bé là một sinh mạng cần được chở che. Hãy chọn một người bạn bốn chân để gửi gắm lời chúc ấm áp nhất nhé!
            </p>
          </div>

          {/* Animal Grid */}
          <AnimalGrid
            animals={ANIMALS}
            selectedId={selectedId}
            onSelect={handleSelectAnimal}
          />

          {/* Action Bar / Bottom Sticky */}
          <div className="mt-12 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {currentChosenAnimal ? (
                <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-orange-200 shadow-sm animate-in fade-in">
                  <img
                    src={currentChosenAnimal.asset}
                    alt={currentChosenAnimal.alt}
                    className="w-10 h-10 object-contain rounded-xl bg-orange-50 p-1"
                  />
                  <div>
                    <p className="text-xs text-stone-500 font-semibold">Bạn đang chọn:</p>
                    <p className="text-sm font-extrabold text-orange-600">
                      {currentChosenAnimal.displayName} ({currentChosenAnimal.type === 'cat' ? 'Bé Mèo' : 'Bé Chó'})
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-stone-500 text-sm italic">
                  <HeartHandshake className="w-4 h-4 text-stone-400" />
                  Vui lòng chọn 1 bé ở trên để tiếp tục
                </div>
              )}
            </div>

            <Button
              size="lg"
              variant="primary"
              disabled={!selectedId}
              onClick={handleContinue}
              className="w-full sm:w-auto px-8 py-3.5 shadow-md group"
            >
              <span>Viết lời chúc tiếp theo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </PageContainer>
      </main>
    </div>
  );
};
