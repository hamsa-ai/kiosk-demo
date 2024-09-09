export interface Category {
  id: string;
  name: string;
  type: string;
  discount?: string;
  backgroundColor: string;
  image: string;
  steps?: ComboStep[];
  items: Item[];
}

export interface ComboStep {
  id: string;
  name: string;
  prompt: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}
