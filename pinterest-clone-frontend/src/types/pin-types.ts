export interface PinData {
  id: string | number;
  src: string;
  alt: string;
  title?: string;
  author?: string;
  user_id?: number;
  description?: string;
  image_url?: string;
  source_url?: string;
  created_at?: string;
}

export interface PinCardProps {
  pin: PinData;
}

export interface Collection {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCollectionRequest {
  name: string;
  description?: string;
  is_private: boolean;
}

export interface CreatePinRequest {
  title: string;
  description?: string;
  image_url: string;
  source_url?: string;
}