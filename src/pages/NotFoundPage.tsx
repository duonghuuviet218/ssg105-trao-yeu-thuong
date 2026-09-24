import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Home } from 'lucide-react';
import catStandingChubby from '@/assets/animals/cat-standing-chubby.webp';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-warm-bg text-warm-text">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <PageContainer className="text-center py-12">
          <div className="max-w-md mx-auto space-y-6">
            <img
              src={catStandingChubby}
              alt="Mèo lạc đường"
              className="w-40 h-40 object-contain mx-auto animate-bounce duration-1000"
            />
            <h1 className="text-4xl font-extrabold text-stone-800">Ối, lạc đường rồi!</h1>
            <p className="text-stone-600">
              Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang trạm khác.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              <span>Quay về Trang chủ</span>
            </Button>
          </div>
        </PageContainer>
      </main>
    </div>
  );
};
