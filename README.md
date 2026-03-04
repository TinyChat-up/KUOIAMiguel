# KUOIA

Proyecto base listo para desplegar en **Vercel** con **Next.js 14 App Router + TypeScript strict + Tailwind + shadcn/ui + Supabase + Stripe (test)**.

## Stack
- Next.js 14 (App Router)
- TypeScript strict
- TailwindCSS + componentes UI estilo shadcn
- Supabase (`@supabase/supabase-js` v2 + `@supabase/ssr`)
- Stripe Node SDK
- Zod + React Hook Form

## Rutas incluidas
- `/` Home
- `/marketplace`
- `/services`
- `/schools`
- `/login`
- `/signup`
- `/profile` (protegida)
- `/billing` (protegida)
- `/api/health`
- `/api/stripe/create-checkout-session`
- `/api/stripe/customer-portal`
- `/api/stripe/webhook`

## Variables de entorno (local y Vercel)
Usa exactamente estas variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (solo server)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_MONTHLY`
- `NEXT_PUBLIC_SITE_URL` (`https://tu-dominio.vercel.app` en prod)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (si usas Stripe.js en cliente)

Copia `.env.example` a `.env.local` y completa valores.

---

## Setup local (paso a paso)
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Configura `.env.local` desde `.env.example`.
3. Crea el proyecto en Supabase.
4. Abre SQL Editor y ejecuta `db/schema.sql` completo.
5. En Supabase Auth > Providers, habilita **Email**.
6. Configura URLs de Auth:
   - Site URL local: `http://localhost:3000`
   - Redirect URL local: `http://localhost:3000/auth/callback`
7. Arranca en local:
   ```bash
   npm run dev
   ```

## Stripe (test mode)
1. En Stripe crea un producto recurrente mensual y guarda su `price_id`.
2. Añade en `.env.local`:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRICE_ID_MONTHLY`
3. Ejecuta webhook local con Stripe CLI (opcional):
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. Copia el signing secret en `STRIPE_WEBHOOK_SECRET`.

> Importante: el webhook usa `runtime = "nodejs"` y firma con **raw body** (`request.text()`), compatible con Vercel.

## Deploy en Vercel
1. Sube repo a GitHub.
2. En Vercel: **New Project** > importa el repositorio.
3. Añade todas las variables de entorno listadas arriba.
4. Define `NEXT_PUBLIC_SITE_URL=https://tu-app.vercel.app`.
5. Deploy.

## Configuración Supabase para producción
En Supabase Auth:
- Site URL: `https://tu-app.vercel.app`
- Redirect URL: `https://tu-app.vercel.app/auth/callback`

## Configuración webhook Stripe para producción
1. En Stripe Dashboard > Developers > Webhooks > Add endpoint.
2. Endpoint:
   `https://tu-app.vercel.app/api/stripe/webhook`
3. Eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copia signing secret a `STRIPE_WEBHOOK_SECRET` en Vercel.

## Checklist post-deploy
- [ ] `/api/health` devuelve `{ ok: true }`
- [ ] Home y rutas públicas cargan (`/`, `/marketplace`, `/services`, `/schools`)
- [ ] Signup + login funciona
- [ ] `/profile` y `/billing` redirigen a `/login` sin sesión
- [ ] Botón **Suscribirme** crea checkout de Stripe
- [ ] Botón **Gestionar suscripción** abre customer portal
- [ ] Webhook actualiza `stripe_customers` y `stripe_subscriptions`

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Troubleshooting
### 1) Login funciona pero redirect falla
Verifica que las URLs en Supabase Auth coinciden exactamente con local/prod, incluyendo `https` en Vercel.

### 2) Webhook Stripe devuelve 400
Revisa `STRIPE_WEBHOOK_SECRET` y que apunte al endpoint correcto. Asegúrate de reenviar el evento al dominio actual de Vercel.

### 3) Error RLS al leer/escribir
Ejecuta `db/schema.sql` completo. Si cambiaste políticas, revisa `auth.uid()` y ownership de filas.

### 4) Build falla en Vercel
Confirma variables env, que no faltan exports de páginas/route handlers, y que las rutas de Stripe usan runtime Node.js.
