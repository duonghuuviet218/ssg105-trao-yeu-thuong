// ==============================================================================
// CONTRACT TYPES: types_database.ts
// PROJECT: Trạm Yêu Thương - SSG105
// DESCRIPTION: Định nghĩa TypeScript types cho 4 bảng cơ sở dữ liệu trên Supabase
//              Backend bàn giao cho Frontend để đồng bộ data model.
// ==============================================================================

export type AnimalType = 'dog' | 'cat';

export type WishStatus = 'pending' | 'approved' | 'rejected';

export interface Wish {
  id: string;
  animal_type: AnimalType;
  animal_id: string;
  message: string;
  status: WishStatus;
  created_at: string;
}

export interface CreateWishInput {
  animal_type: AnimalType;
  animal_id: string;
  message: string;
}

export interface RescueCenter {
  id: string;
  name: string;
  city: string;
  district: string | null;
  phone: string | null;
  facebook_url: string | null;
  website_url: string | null;
  description: string | null;
  last_verified_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ScenarioOption {
  id: string;
  text: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  options: ScenarioOption[];
  recommended_answer: string;
  explanation: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ProjectStats {
  id: string;
  products_sold: number;
  revenue: number;
  fund_raised: number;
  amount_donated: number;
  participants: number;
  updated_at: string;
}
