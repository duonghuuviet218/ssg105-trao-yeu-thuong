import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { useJourney } from '../context/JourneyContext';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const WriteWishPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedAnimal } = useJourney();

  // Guard flow: nếu chưa chọn animal thì chuyển về /choose
  useEffect(() => {
    if (!selectedAnimal) {
      navigate('/choose', { replace: true });
    }
  }, [selectedAnimal, navigate]);

  if (!selectedAnimal) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-warm-bg text-warm-text">
      <Header />
      <main className="flex-1">
        <PageContainer>
          <div className="max-w-xl mx-auto text-center py-10 space-y-6">
            <Link
              to="/choose"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-500 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Chọn lại người bạn khác
            </Link>

            <div className="bg-white p-8 rounded-4xl border border-orange-100 shadow-cute space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                Bước 2: Viết lời chúc
              </div>

              <div className="w-28 h-28 mx-auto rounded-3xl bg-orange-50 p-3 flex items-center justify-center border-2 border-orange-200">
                <img
                  src={selectedAnimal.asset}
                  alt={selectedAnimal.alt}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-stone-800">
                  Gửi lời chúc cho {selectedAnimal.displayName || (selectedAnimal.type === 'cat' ? 'Bé Mèo' : 'Bé Cún')}
                </h2>
                <p className="text-sm text-stone-500 mt-1 italic">
                  "{selectedAnimal.personality}"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 text-sm text-stone-600">
                (Màn hình SCR-003 Write Wish sẽ được triển khai ở prompt tiếp theo!)
              </div>

              <Button
                variant="outline"
                onClick={() => navigate('/choose')}
                className="w-full"
              >
                Quay lại chọn bạn khác
              </Button>
            </div>
          </div>
        </PageContainer>
      </main>
    </div>
  );
};
