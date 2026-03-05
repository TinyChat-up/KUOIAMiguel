import { products as seedProducts, reviews, schools, services } from "@/lib/mock-data";
import { Product, ProductFilters, Review, School, Service } from "@/lib/types";

let sessionProducts = [...seedProducts];

const wait = async (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const addSessionProduct = (product: Product) => {
  sessionProducts = [product, ...sessionProducts];
};

export const getProducts = async (filters: ProductFilters = {}) => {
  await wait(700);
  return sessionProducts.filter((p) => {
    if (filters.query && !`${p.title} ${p.description}`.toLowerCase().includes(filters.query.toLowerCase())) return false;
    if (filters.category && filters.category !== "all" && p.category !== filters.category) return false;
    if (filters.condition && filters.condition !== "all" && p.condition !== filters.condition) return false;
    if (filters.city && filters.city !== "all" && p.city !== filters.city) return false;
    if (filters.schoolId && filters.schoolId !== "all" && p.schoolId !== filters.schoolId) return false;
    if (typeof filters.priceMin === "number" && p.price < filters.priceMin) return false;
    if (typeof filters.priceMax === "number" && p.price > filters.priceMax) return false;
    return true;
  });
};

export const getProductById = async (id: string) => {
  await wait(350);
  return sessionProducts.find((item) => item.id === id) ?? null;
};

export const getServices = async () => {
  await wait(600);
  return services;
};

export const getServiceById = async (id: string) => {
  await wait(350);
  return services.find((service) => service.id === id) ?? null;
};

export const getSchools = async () => {
  await wait(600);
  return schools;
};

export const getSchoolById = async (id: string) => {
  await wait(350);
  return schools.find((school) => school.id === id) ?? null;
};

export const getReviews = async (targetType?: Review["targetType"], targetId?: string) => {
  await wait(250);
  if (!targetType || !targetId) return reviews;
  return reviews.filter((review) => review.targetType === targetType && review.targetId === targetId);
};

export const getAverageRating = (serviceId: string) => {
  const serviceReviews = reviews.filter((r) => r.targetType === "service" && r.targetId === serviceId);
  if (!serviceReviews.length) return 0;
  return serviceReviews.reduce((sum, item) => sum + item.rating, 0) / serviceReviews.length;
};

export const getRelatedSchoolData = (schoolId: string): { official: Product[]; secondHand: Product[]; linkedServices: Service[]; schoolReviews: Review[]; school: School | undefined } => {
  const school = schools.find((item) => item.id === schoolId);
  const schoolProducts = sessionProducts.filter((item) => item.schoolId === schoolId);
  return {
    school,
    official: schoolProducts.filter((item) => item.isOfficial),
    secondHand: schoolProducts.filter((item) => !item.isOfficial),
    linkedServices: services.filter((service) => service.schoolIds.includes(schoolId)),
    schoolReviews: reviews.filter((review) => review.targetType === "school" && review.targetId === schoolId)
  };
};
