export interface PinData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  author?: string;
}

export interface PinCardProps {
  pin: PinData;
}