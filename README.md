# KUOIA

Marketplace escolar con Next.js + Supabase + Stripe.

## Stack
- Next.js 14 (App Router) + TypeScript strict
- TailwindCSS + componentes estilo shadcn/ui
- Supabase (Auth, Postgres, Storage, Realtime)
- Stripe (modo test) para suscripciones de anunciantes

## Estructura principal
- `app/` rutas App Router y API routes
- `components/` UI + formularios
- `lib/` clientes Supabase/Stripe
- `db/schema.sql` esquema completo + RLS + policies
- `db/seed.sql` datos opcionales
- `vercel.json` configuración de despliegue

## Configuración Supabase (obligatoria)
1. Crear proyecto en Supabase.
2. En SQL Editor, ejecutar `db/schema.sql`.
3. (Opcional) Ejecutar `db/seed.sql` reemplazando UUIDs de usuarios por IDs reales de `auth.users`.
4. Crear buckets públicos:
   - `product-images`
   - `service-images`
5. Ejecutar las policies de Storage comentadas al final de `db/schema.sql`.
6. Configurar Auth > URL Configuration:
   - **Site URL**: `http://localhost:3000` (local) y luego dominio Vercel en producción.
   - **Redirect URLs**:
     - `http://localhost:3000/auth/callback`
     - `https://TU_DOMINIO_VERCEL/auth/callback`

## Configuración Stripe (test)
1. Crear producto + precio mensual en Stripe.
2. Guardar el `price_id` del plan en `STRIPE_PRICE_ID_MONTHLY`.
3. Crear endpoint webhook:
   - `https://TU_DOMINIO_VERCEL/api/stripe/webhook`
4. Suscribir eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copiar Signing Secret a `STRIPE_WEBHOOK_SECRET`.

## Variables de entorno
Copia `.env.example` a `.env.local` y completa valores.

```bash
cp .env.example .env.local
```

## Desarrollo local
```bash
npm install
npm run predeploy:check
npm run dev
```

## Deploy en Vercel (paso a paso)
1. Subir repo a GitHub/GitLab/Bitbucket.
2. En Vercel: **Add New Project** -> importar repo.
3. Framework detectado: **Next.js**.
4. Configurar variables de entorno (Production + Preview):
   - `NEXT_PUBLIC_SITE_URL=https://TU_DOMINIO_VERCEL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRICE_ID_MONTHLY`
5. Deploy.
6. Tras el primer deploy:
   - Añadir dominio final en Supabase Auth (Site URL + Redirect URL).
   - Verificar webhook en Stripe apunta al dominio correcto.
7. Prueba de humo en producción:
   - `GET /api/health` responde `{ ok: true }`
   - Crear anuncio en `/marketplace/new`
   - Abrir checkout de suscripción desde `/api/stripe/checkout`
   - Simular evento Stripe y verificar actualización de `stripe_subscriptions`/`services.subscription_status`.

## Rutas mínimas implementadas
- `/` home
- `/marketplace`, `/marketplace/new`, `/marketplace/[id]`
- `/services`, `/services/[id]`
- `/schools`, `/schools/[id]`
- `/messages`
- `/profile`
- `/admin`
- `/api/health`

## Endpoints backend
- `POST /api/products`
- `POST /api/stripe/checkout`
- `POST /api/stripe/portal`
- `POST /api/stripe/webhook`
- `GET /api/health`
