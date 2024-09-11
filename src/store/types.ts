export interface Category {
  id: string;
  name: string;
  nameArabic: string;
  backgroundColor: string;
  image: string;
  items: Item[];
}

export interface Item {
  id: string;
  name: string;
  nameArabic: string;
  price: number;
  image: string;
  calories: number;
}
