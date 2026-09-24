import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import catOrangeWhite from '@/assets/animals/cat-orange-white.webp';
import dogCorgi from '@/assets/animals/dog-corgi.webp';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-warm-bg text-warm-text">
      <Header />
      <main className="flex-1 flex items-center">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8 sm:py-16">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs sm:text-sm font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-orange-500" />
                Chiến dịch cộng đồng SSG105
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                Đừng chỉ gửi một lời chúc. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
                  Hãy biết cách giúp một sinh mạng.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Chào mừng bạn đến với <strong>Trạm Yêu Thương</strong> — nơi kết nối tình thương, sẻ chia lời chúc và trang bị kỹ năng cứu hộ chó mèo bị bỏ rơi.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/choose')}
                  className="w-full sm:w-auto shadow-lg shadow-orange-300/50 group"
                >
                  <span>Bắt đầu hành trình</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/scenarios')}
                  className="w-full sm:w-auto"
                >
                  <ShieldCheck className="w-5 h-5 text-orange-600" />
                  <span>Kỹ năng cứu hộ</span>
                </Button>
              </div>

              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-200/80 text-center lg:text-left">
                <div>
                  <p className="text-2xl font-black text-orange-600">100%</p>
                  <p className="text-xs text-stone-500 font-semibold">Tình nguyện phi lợi nhuận</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-orange-600">SSG105</p>
                  <p className="text-xs text-stone-500 font-semibold">Gây quỹ cứu trợ</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-orange-600">24/7</p>
                  <p className="text-xs text-stone-500 font-semibold">Cẩm nang hướng dẫn</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Artwork */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-square">
                {/* Decorative blob background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/40 via-orange-200/30 to-rose-200/40 rounded-full blur-3xl transform -rotate-6 scale-95" />

                {/* Main Card Floating */}
                <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-4xl border border-orange-100 shadow-cute space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-xs font-bold text-stone-400">Trạm Yêu Thương</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-orange-50/70 p-3 rounded-2xl flex flex-col items-center text-center">
                      <img src={catOrangeWhite} alt="Mèo cam" className="w-24 h-24 object-contain" />
                      <span className="text-xs font-bold text-stone-700 mt-1">Miu Vàng</span>
                    </div>
                    <div className="bg-amber-50/70 p-3 rounded-2xl flex flex-col items-center text-center">
                      <img src={dogCorgi} alt="Corgi" className="w-24 h-24 object-contain" />
                      <span className="text-xs font-bold text-stone-700 mt-1">Corgi Hạt Dẻ</span>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-100/60 rounded-2xl text-xs text-stone-700 font-medium text-center">
                    "Mong em sớm tìm được một mái nhà ấm êm!"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </main>
    </div>
  );
};
