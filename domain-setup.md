# Configuración de Dominio Personalizado

## 1. Configuración en Vercel

### Pasos para configurar dominio personalizado en Vercel:

1. **Conectar dominio a Vercel:**
   ```bash
   # Instalar Vercel CLI
   npm install -g vercel
   
   # Hacer login
   vercel login
   
   # Agregar dominio
   vercel domains add your-domain.com
   ```

2. **Configurar DNS:**
   - Ve a tu proveedor de DNS (Cloudflare, GoDaddy, etc.)
   - Agrega un registro CNAME:
     ```
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```
   - Para el dominio raíz, agrega un registro A:
     ```
     Type: A
     Name: @
     Value: 76.76.19.61
     ```

3. **Configurar en Vercel Dashboard:**
   - Ve a tu proyecto en Vercel
   - Settings > Domains
   - Agrega tu dominio
   - Sigue las instrucciones de verificación

## 2. Configuración en Netlify

### Pasos para configurar dominio personalizado en Netlify:

1. **Agregar dominio:**
   - Ve a tu sitio en Netlify
   - Domain settings > Add custom domain
   - Ingresa tu dominio

2. **Configurar DNS:**
   - Agrega un registro CNAME:
     ```
     Type: CNAME
     Name: www
     Value: your-site-name.netlify.app
     ```
   - Para el dominio raíz, agrega un registro A:
     ```
     Type: A
     Name: @
     Value: 75.2.60.5
     ```

3. **Configurar SSL:**
   - Netlify automáticamente configura SSL con Let's Encrypt
   - Verifica que el certificado esté activo

## 3. Configuración de DNS Avanzada

### Para Cloudflare:

1. **Agregar sitio a Cloudflare:**
   - Agrega tu dominio a Cloudflare
   - Cambia los nameservers en tu registrador

2. **Configurar registros DNS:**
   ```
   Type: CNAME
   Name: www
   Content: your-site.vercel.app (o .netlify.app)
   Proxy: Proxied (naranja)
   
   Type: CNAME
   Name: @
   Content: your-site.vercel.app (o .netlify.app)
   Proxy: Proxied (naranja)
   ```

3. **Configurar Page Rules (opcional):**
   - Redirect HTTP to HTTPS
   - Cache static assets

### Para otros proveedores DNS:

1. **GoDaddy:**
   - Ve a DNS Management
   - Agrega registros CNAME y A según las instrucciones

2. **Namecheap:**
   - Ve a Advanced DNS
   - Agrega registros según las instrucciones

## 4. Verificación y Testing

### Comandos para verificar configuración:

```bash
# Verificar DNS
nslookup your-domain.com
dig your-domain.com

# Verificar SSL
curl -I https://your-domain.com

# Verificar redirección
curl -I http://your-domain.com
```

### Checklist de verificación:

- [ ] Dominio resuelve correctamente
- [ ] SSL certificado está activo
- [ ] Redirección HTTP a HTTPS funciona
- [ ] www redirige al dominio principal
- [ ] Todas las rutas funcionan correctamente
- [ ] Variables de entorno están configuradas para producción

## 5. Configuración de Variables de Entorno para Producción

Actualiza tu archivo `.env.local` o configura las variables en tu plataforma de despliegue:

```env
# Para producción
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## 6. Troubleshooting

### Problemas comunes:

1. **DNS no resuelve:**
   - Verifica que los registros DNS estén correctos
   - Espera hasta 48 horas para propagación completa
   - Usa herramientas como `dig` o `nslookup`

2. **SSL no funciona:**
   - Verifica que el dominio esté correctamente configurado
   - Espera a que el certificado se genere (puede tomar hasta 24 horas)
   - Verifica que no haya conflictos con otros certificados

3. **Redirección no funciona:**
   - Verifica la configuración de redirección en tu plataforma
   - Asegúrate de que los registros DNS estén correctos

4. **Variables de entorno no funcionan:**
   - Verifica que estén configuradas en la plataforma de despliegue
   - Asegúrate de que los nombres sean exactos
   - Reinicia el despliegue después de cambiar variables

## 7. Monitoreo

### Herramientas recomendadas:

1. **Uptime monitoring:**
   - UptimeRobot
   - Pingdom
   - StatusCake

2. **Performance monitoring:**
   - Vercel Analytics
   - Netlify Analytics
   - Google PageSpeed Insights

3. **Error tracking:**
   - Sentry
   - LogRocket
   - Bugsnag
