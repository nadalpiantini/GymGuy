# Deployment Guide - Workout.cool

This guide will help you deploy the Workout.cool application to production.

## Prerequisites

- Node.js 18+ installed
- Supabase account and project
- Stripe account (for premium features)
- Domain name (optional)

## 1. Environment Setup

### Create Environment Variables

Copy the example environment file and fill in your values:

```bash
cp env.example .env.local
```

Required environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration (for premium features)
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Run the database migrations:

```bash
# Copy the migration file to your Supabase project
# You can do this through the Supabase dashboard SQL editor
# or using the Supabase CLI
```

4. Run the seed data:

```bash
# Copy the seed.sql content to your Supabase project
# This will populate the database with initial data
```

### Stripe Setup (Optional)

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable and secret keys from the dashboard
3. Set up webhooks for subscription events
4. Configure your products and pricing

## 2. Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... add all other variables
```

### Option 2: Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Option 3: Self-Hosting

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

3. Use a reverse proxy (nginx/Apache) for SSL and domain routing

### Option 4: Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t workout-cool .
docker run -p 3000:3000 workout-cool
```

## 3. Database Configuration

### Row Level Security (RLS)

The application uses Supabase's Row Level Security. Make sure RLS is enabled on all tables:

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
-- ... etc for all tables
```

### Backup Strategy

Set up regular database backups:

```bash
# Using Supabase CLI
supabase db dump --file backup.sql

# Or use Supabase's built-in backup features
```

## 4. Monitoring and Analytics

### Error Tracking

Consider adding error tracking:

```bash
npm install @sentry/nextjs
```

### Analytics

Add analytics for user behavior:

```bash
npm install @vercel/analytics
```

## 5. Security Considerations

### Environment Variables

- Never commit `.env.local` to version control
- Use different keys for development and production
- Rotate keys regularly

### HTTPS

- Always use HTTPS in production
- Set up SSL certificates (Let's Encrypt recommended)

### Rate Limiting

Consider implementing rate limiting for API endpoints:

```javascript
// Example with express-rate-limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

## 6. Performance Optimization

### CDN

Use a CDN for static assets:

- Vercel automatically provides CDN
- For other deployments, consider Cloudflare or AWS CloudFront

### Caching

Implement caching strategies:

```javascript
// Next.js API route caching
export async function GET() {
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  });
}
```

### Image Optimization

Optimize images using Next.js Image component:

```jsx
import Image from 'next/image';

<Image
  src="/exercise-image.jpg"
  alt="Exercise demonstration"
  width={400}
  height={300}
  priority
/>
```

## 7. Maintenance

### Regular Updates

- Keep dependencies updated
- Monitor security advisories
- Update Node.js version regularly

### Database Maintenance

- Monitor database performance
- Clean up old data periodically
- Optimize queries

### Backup Verification

- Test backup restoration regularly
- Verify data integrity

## 8. Scaling Considerations

### Database Scaling

- Monitor database performance
- Consider read replicas for heavy read workloads
- Implement connection pooling

### Application Scaling

- Use horizontal scaling (multiple instances)
- Implement load balancing
- Monitor resource usage

### Caching

- Implement Redis for session storage
- Use CDN for static assets
- Cache API responses

## 9. Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection Issues**
   - Verify Supabase credentials
   - Check network connectivity
   - Verify RLS policies

3. **Authentication Issues**
   - Check JWT configuration
   - Verify redirect URLs
   - Check CORS settings

### Logs

Monitor application logs:

```bash
# Vercel
vercel logs

# Docker
docker logs container-name

# Self-hosted
pm2 logs
```

## 10. Support

For deployment issues:

- Check the [GitHub Issues](https://github.com/workout-cool/issues)
- Join our [Discord Community](https://discord.gg/workout-cool)
- Email: support@workout.cool

## 11. Production Checklist

Before going live:

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificate installed
- [ ] Error tracking configured
- [ ] Analytics set up
- [ ] Backup strategy implemented
- [ ] Monitoring configured
- [ ] Performance tested
- [ ] Security audit completed
- [ ] Documentation updated

---

**Happy Deploying! 🚀**

Remember: This is an open-source project. Feel free to contribute improvements to this deployment guide!
