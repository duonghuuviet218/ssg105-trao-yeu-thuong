import { Animal } from '../types';

import catOrangeWhite from '@/assets/animals/cat-orange-white.webp';
import catStandingChubby from '@/assets/animals/cat-standing-chubby.webp';
import catCalico from '@/assets/animals/cat-calico.webp';
import catSiamese from '@/assets/animals/cat-siamese.webp';
import catTabby from '@/assets/animals/cat-tabby.webp';
import catBlack from '@/assets/animals/cat-black.webp';
import catWhiteChibi from '@/assets/animals/cat-white-chibi.webp';
import catGrayChibi from '@/assets/animals/cat-gray-chibi.webp';
import dogCorgi from '@/assets/animals/dog-corgi.webp';
import dogShiba from '@/assets/animals/dog-shiba.webp';

export const ANIMALS: Animal[] = [
  {
    id: 'cat-orange-white',
    type: 'cat',
    displayName: 'Miu Vàng',
    asset: catOrangeWhite,
    alt: 'Mèo cam trắng nằm cuộn tròn dễ thương',
    personality: 'Thích nằm sưởi nắng và lim dim cả ngày',
  },
  {
    id: 'dog-corgi',
    type: 'dog',
    displayName: 'Corgi Hạt Dẻ',
    asset: dogCorgi,
    alt: 'Chú chó Corgi vui vẻ tai to đáng yêu',
    personality: 'Năng động, thích chạy nhảy và luôn vẫy đuôi mừng bạn',
  },
  {
    id: 'cat-standing-chubby',
    type: 'cat',
    displayName: 'Bánh Bao',
    asset: catStandingChubby,
    alt: 'Mèo béo đứng ngơ ngác đáng yêu',
    personality: 'Hơi mũm mĩm, thích được xoa bụng và ăn ngon',
  },
  {
    id: 'dog-shiba',
    type: 'dog',
    displayName: 'Shiba Mochi',
    asset: dogShiba,
    alt: 'Chú chó Shiba Inu má phúng phính',
    personality: 'Hiền lành, trung thành và luôn mỉm cười ấm áp',
  },
  {
    id: 'cat-calico',
    type: 'cat',
    displayName: 'Miu Tam Thể',
    asset: catCalico,
    alt: 'Mèo tam thể nằm ngoan ngoãn',
    personality: 'Dịu dàng, mang lại may mắn và bình yên',
  },
  {
    id: 'cat-white-chibi',
    type: 'cat',
    displayName: 'Bơ Sữa',
    asset: catWhiteChibi,
    alt: 'Mèo trắng mắt to tròn ngây thơ',
    personality: 'Rất quấn người và thích được ôm ấp',
  },
  {
    id: 'cat-black',
    type: 'cat',
    displayName: 'Mun Đen',
    asset: catBlack,
    alt: 'Mèo mun đen bí ẩn với đôi mắt sáng',
    personality: 'Trông bí ẩn nhưng bên trong cực kỳ ngọt ngào',
  },
  {
    id: 'cat-siamese',
    type: 'cat',
    displayName: 'Miu Xiêm',
    asset: catSiamese,
    alt: 'Mèo Xiêm mũi đen quý phái',
    personality: 'Thông minh, tò mò và thích tâm sự',
  },
  {
    id: 'cat-gray-chibi',
    type: 'cat',
    displayName: 'Miu Xám Khói',
    asset: catGrayChibi,
    alt: 'Mèo lông xám đáng yêu',
    personality: 'Điềm tĩnh, thích quan sát thế giới xung quanh',
  },
  {
    id: 'cat-tabby',
    type: 'cat',
    displayName: 'Miu Mướp',
    asset: catTabby,
    alt: 'Mèo vằn mướp truyền thống',
    personality: 'Nhanh nhẹn, tinh nghịch và rất can đảm',
  },
];
