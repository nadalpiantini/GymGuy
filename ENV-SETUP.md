# Configuración de Variables de Entorno

## Problema Resuelto: Equipamiento no aparece en la página de workouts

El problema era que las variables de entorno de Supabase no estaban configuradas, lo que impedía que se cargaran los datos de equipamiento.

## Solución

### Opción 1: Usar datos mock (Recomendado para desarrollo)

1. Copia el archivo `env.example` a `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. El archivo `.env.local` ya está configurado para usar datos mock con estos valores:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_key
   ```

3. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Opción 2: Usar Supabase real

1. Crea un archivo `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Edita `.env.local` y reemplaza los valores de Supabase con tus credenciales reales:
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
   ```

3. Asegúrate de que tu base de datos de Supabase tenga las tablas `equipment` y `muscles` con datos.

## Verificación

Después de configurar las variables de entorno:

1. Ve a `http://localhost:3000/workouts`
2. Deberías ver las opciones de equipamiento disponibles para seleccionar
3. Si usas datos mock, verás: Dumbbells, Barbell, Kettlebell, Resistance Bands, Bodyweight, Pull-up Bar

## Notas Técnicas

- El código ahora detecta automáticamente si está en modo desarrollo (datos mock) o producción (Supabase real)
- Se agregó un console.log para debug: "Using mock data for development"
- La lógica de detección incluye múltiples casos: undefined, placeholder, y valores de ejemplo
