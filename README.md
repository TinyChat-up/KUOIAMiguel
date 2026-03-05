# KUOIA UI/UX Playground

Demo front-end de KUOIA construido con **Next.js App Router + TypeScript + Tailwind + componentes estilo shadcn/ui**. No usa base de datos, backend, Supabase ni Stripe.

## Stack
- Next.js 14 (App Router)
- TypeScript strict
- TailwindCSS
- Radix UI + componentes estilo shadcn/ui
- UI primitives propios estilo shadcn/ui (Dialog, Drawer, Tabs, Toast, Skeleton)

## Ejecutar en local
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Levanta el proyecto:
   ```bash
   npm run dev
   ```
3. Abre `http://localhost:3000`.

## Scripts
- `npm run dev` → desarrollo
- `npm run build` → build producción
- `npm run start` → servir build
- `npm run lint` → lint

## Deploy en Vercel (paso a paso)
1. Crea un repositorio (GitHub/GitLab/Bitbucket) y sube este proyecto.
2. Entra a [vercel.com](https://vercel.com) y pulsa **Add New Project**.
3. Importa el repositorio.
4. Verifica configuración (defaults de Next.js):
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install`
5. Pulsa **Deploy**.

No se requieren variables de entorno para esta demo.

## Estructura
- `app/` rutas de la demo (home, marketplace, services, schools, ui)
- `components/` navbar, cards, filtros, estados, footer
- `lib/mock-data.ts` datos mock tipados
- `lib/mock-api.ts` helpers async con delay simulado
