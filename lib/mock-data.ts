import { Product, Review, School, Service } from "@/lib/types";

export const schools: School[] = [
  { id: "scl-1", name: "Colegio Monteluz", city: "Madrid", logo: "🏫", verified: true, summary: "Innovación educativa y comunidad activa.", extracurriculars: ["Robótica", "Inglés Cambridge", "Piano"] },
  { id: "scl-2", name: "Colegio Bosque Sur", city: "Valencia", logo: "🌳", verified: true, summary: "Aprendizaje experiencial y deporte.", extracurriculars: ["Baloncesto", "Teatro", "Programación"] },
  { id: "scl-3", name: "Colegio Mar Azul", city: "Málaga", logo: "🌊", verified: true, summary: "Bilingüe con enfoque creativo.", extracurriculars: ["Arte Digital", "Vela", "Francés"] }
];

export const products: Product[] = [
  { id: "prd-1", title: "Uniforme completo talla 10", description: "En perfecto estado, chaqueta y pantalón.", price: 42, category: "Uniformes", condition: "segunda_mano", city: "Madrid", schoolId: "scl-1", isOfficial: false, image: "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?q=80&w=1200&auto=format&fit=crop" },
  { id: "prd-2", title: "Pack libros 5º Primaria", description: "Lote oficial curso 2026.", price: 120, category: "Libros", condition: "nuevo", city: "Valencia", schoolId: "scl-2", isOfficial: true, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop" },
  { id: "prd-3", title: "Mochila escolar KUOIA", description: "Producto oficial del colegio.", price: 35, category: "Accesorios", condition: "nuevo", city: "Madrid", schoolId: "scl-1", isOfficial: true, image: "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?q=80&w=1200&auto=format&fit=crop" },
  { id: "prd-4", title: "Calculadora científica", description: "Ideal para secundaria.", price: 18, category: "Tecnología", condition: "segunda_mano", city: "Málaga", schoolId: "scl-3", isOfficial: false, image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=1200&auto=format&fit=crop" }
];

export const services: Service[] = [
  { id: "srv-1", name: "Academia Pixel", description: "Refuerzo STEM para primaria y secundaria.", category: "Refuerzo", city: "Madrid", schoolIds: ["scl-1", "scl-3"], image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop" },
  { id: "srv-2", name: "Move Sports", description: "Actividades deportivas extraescolares.", category: "Deporte", city: "Valencia", schoolIds: ["scl-2"], image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop" },
  { id: "srv-3", name: "Lingua Kids", description: "Idiomas para niños con metodología activa.", category: "Idiomas", city: "Málaga", schoolIds: ["scl-2", "scl-3"], image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop" }
];

export const reviews: Review[] = [
  { id: "rev-1", targetType: "service", targetId: "srv-1", author: "Laura", rating: 5, comment: "Muy profesionales y cercanos." },
  { id: "rev-2", targetType: "service", targetId: "srv-1", author: "Miguel", rating: 4, comment: "Gran evolución académica." },
  { id: "rev-3", targetType: "service", targetId: "srv-2", author: "Pablo", rating: 4, comment: "Entrenadores excelentes." },
  { id: "rev-4", targetType: "school", targetId: "scl-1", author: "Inés", rating: 5, comment: "Comunidad familiar increíble." },
  { id: "rev-5", targetType: "school", targetId: "scl-2", author: "Sergio", rating: 4, comment: "Proyecto educativo sólido." }
];
