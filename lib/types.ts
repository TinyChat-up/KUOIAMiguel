export type ProductCondition = "nuevo" | "segunda_mano";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: ProductCondition;
  city: string;
  schoolId: string;
  isOfficial: boolean;
  image: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  schoolIds: string[];
  image: string;
};

export type School = {
  id: string;
  name: string;
  city: string;
  logo: string;
  verified: boolean;
  summary: string;
  extracurriculars: string[];
};

export type Review = {
  id: string;
  targetType: "service" | "school";
  targetId: string;
  author: string;
  rating: number;
  comment: string;
};

export type SessionUser = {
  name: string;
  email: string;
};

export type ProductFilters = {
  query?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  condition?: ProductCondition | "all";
  city?: string;
  schoolId?: string;
};
