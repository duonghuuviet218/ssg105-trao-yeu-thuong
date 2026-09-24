import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { JourneyProvider } from './context/JourneyContext';
import { HomePage } from './pages/HomePage';
import { ChooseAnimalPage } from './pages/ChooseAnimalPage';
import { WriteWishPage } from './pages/WriteWishPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <JourneyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/choose" element={<ChooseAnimalPage />} />
          <Route path="/wish" element={<WriteWishPage />} />
          {/* Fallback & Redirects */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </JourneyProvider>
  );
};

export default App;
