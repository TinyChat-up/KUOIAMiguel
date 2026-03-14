# KUOIA

Marketplace escolar con Next.js + Supabase + Stripe.

## Stack
- Next.js 14 (App Router) + TypeScript strict
- TailwindCSS + componentes estilo shadcn/ui
- Supabase (Auth, Postgres, Storage, Realtime)
- Stripe (modo test) para suscripciones de anunciantes

## Estructura principal
- `app/` rutas App Router
- `components/` UI + formularios
- `lib/` clientes Supabase/Stripe
- `db/schema.sql` esquema completo + RLS + policies
- `db/seed.sql` datos opcionales

## Configuración paso a paso
1. Crear proyecto en Supabase.
2. En SQL Editor, ejecutar `db/schema.sql`.
3. (Opcional) Ejecutar `db/seed.sql` reemplazando UUIDs de usuarios por IDs reales de `auth.users`.
4. Crear buckets públicos:
   - `product-images`
   - `service-images`
   y ejecutar las policies de storage comentadas al final de `db/schema.sql`.
5. Configurar Auth:
   - Habilitar Email + Magic Link.
   - URL de callback: `http://localhost:3000/auth/callback` y en producción dominio Vercel.
6. Configurar Stripe (test):
   - Crear producto + precio mensual.
   - Copiar `STRIPE_SECRET_KEY` y `STRIPE_PRICE_ID_MONTHLY`.
   - Webhook endpoint: `https://<tu-dominio>/api/stripe/webhook`
   - Escuchar eventos: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `customer.subscription.created`.
   - Copiar `STRIPE_WEBHOOK_SECRET`.
7. Copiar `.env.example` a `.env.local` y completar valores.
8. Instalar dependencias y arrancar:
   ```bash
   npm install
   npm run dev
   ```
9. Deploy Vercel:
   - Importar repo.
   - Añadir mismas variables de entorno.
   - Configurar URL pública en `NEXT_PUBLIC_SITE_URL`.

## Rutas mínimas implementadas
- `/` home
- `/marketplace`, `/marketplace/new`, `/marketplace/[id]`
- `/services`, `/services/[id]`
- `/schools`, `/schools/[id]`
- `/messages`
- `/profile`
- `/admin`

## Notas funcionales
- Alta de productos vía `POST /api/products`.
- Stripe checkout y customer portal:
  - `POST /api/stripe/checkout`
  - `POST /api/stripe/portal`
- Webhook Stripe sincroniza suscripciones y estado en `services`.
