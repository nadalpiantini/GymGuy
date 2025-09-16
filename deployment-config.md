# Configuración de Despliegue - GymGuy

## 1. Variables de Entorno Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration (for premium features)
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 2. Configuración de Supabase

### Pasos para obtener las credenciales:

1. Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto
2. En el dashboard, ve a Settings > API
3. Copia:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Ejecutar migraciones:

1. Ve al SQL Editor en tu dashboard de Supabase
2. Copia y ejecuta el contenido de `supabase/migrations/001_initial_schema.sql`
3. Ejecuta el contenido de `supabase/seed.sql` para datos iniciales

## 3. Configuración de Stripe

### Pasos para obtener las credenciales:

1. Ve a [stripe.com](https://stripe.com) y crea una cuenta
2. En el dashboard, ve a Developers > API keys
3. Copia:
   - Publishable key → `STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
4. Para webhooks, ve a Developers > Webhooks y crea un endpoint

## 4. Configuración para Producción

Para producción, actualiza `NEXT_PUBLIC_APP_URL` con tu dominio real:
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```
