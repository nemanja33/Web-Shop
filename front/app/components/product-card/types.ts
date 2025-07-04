type Card = {
  id: string,
  name: string;
  category: string;
  price: number;
  imageUrl: string | File;
  imageAlt: string;
  description: string;
  rating?: {
    rate: number;
    count: number;
  };
  features: string[];
}

export type { Card };