type Card = {
  id: string;
  date: string;
  time: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating?: {
    rate: number;
    count: number;
  };
  features: string[];
  variants: Variant[]
}

type Variant = {
  color: string;
  stock: number;
}

export type { Card };