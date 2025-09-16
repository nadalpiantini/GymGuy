# Workout.cool - Build Your Perfect Workout

A modern, open-source fitness platform that allows users to create personalized workouts, follow structured programs, and track their fitness journey. Built as a community-driven alternative to abandoned fitness platforms.

## 🚀 Features

### Core Features
- **Workout Generator**: Create personalized workouts by selecting equipment and target muscle groups
- **Structured Programs**: Follow professionally designed programs for different fitness levels
- **Progress Tracking**: Monitor your fitness journey with detailed statistics and analytics
- **Fitness Tools**: Calculate TDEE, BMI, macronutrients, heart rate zones, and 1RM
- **Community**: Compete on leaderboards and stay motivated with the community
- **Premium Features**: Advanced statistics, unlimited history, premium programs, and 1-on-1 coaching

### Technical Features
- **Open Source**: Fully open source and self-hostable
- **Modern Stack**: Built with Next.js, TypeScript, Tailwind CSS, and Supabase
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Internationalization**: Support for multiple languages (EN/ES)
- **Real-time Updates**: Live data synchronization with Supabase
- **Secure Authentication**: JWT-based authentication with row-level security

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Payments**: Stripe (for premium features)
- **Deployment**: Vercel (recommended) or self-hosted
- **Database**: PostgreSQL with Row Level Security (RLS)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for premium features)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/workout-cool.git
cd workout-cool
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Copy the example environment file and fill in your values:
```bash
cp env.example .env.local
```

Required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Supabase Database
1. Create a new Supabase project
2. Run the migration files in the `supabase/migrations/` directory
3. Run the seed data in `supabase/seed.sql`
4. Enable Row Level Security (RLS) policies are included in the migration

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

- **profiles**: User profiles and settings
- **equipment**: Available workout equipment
- **muscles**: Muscle groups for targeting
- **exercises**: Exercise database with videos and instructions
- **workouts**: User-created workout routines
- **workout_items**: Individual exercises within workouts
- **programs**: Structured workout programs
- **program_sessions**: Individual sessions within programs
- **user_programs**: User enrollment in programs
- **session_logs**: Workout session history
- **bodyweight_logs**: Weight tracking history
- **payments**: Premium subscription management
- **leaderboard_snapshots**: Community rankings
- **translations**: Internationalization support

## 🎨 Customization

### Adding New Languages
1. Add translations to the `translations` table in the database
2. Update the `I18nService` in `src/lib/i18n.ts`
3. Add locale support in the UI components

### Adding New Exercise Types
1. Add equipment to the `equipment` table
2. Add muscle groups to the `muscles` table
3. Add exercises to the `exercises` table with proper relationships

### Customizing the UI
- Modify Tailwind CSS classes in components
- Update the color scheme in `tailwind.config.js`
- Customize the layout in `src/app/layout.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Self-Hosting
1. Build the application: `npm run build`
2. Set up a PostgreSQL database
3. Run migrations and seed data
4. Deploy using Docker or your preferred method

### Docker
```bash
# Build the image
docker build -t workout-cool .

# Run the container
docker run -p 3000:3000 workout-cool
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow the existing code style and patterns
- Add proper error handling
- Include JSDoc comments for complex functions
- Write tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Fit'Distance**: Partner for exercise videos and demonstrations
- **Community**: All contributors and users who help improve the platform
- **Open Source**: Built on the shoulders of amazing open source projects

## 📞 Support

- **Documentation**: [docs.workout.cool](https://docs.workout.cool)
- **Discord**: [Join our community](https://discord.gg/workout-cool)
- **GitHub Issues**: [Report bugs or request features](https://github.com/your-username/workout-cool/issues)
- **Email**: support@workout.cool

## 🗺️ Roadmap

### Phase 1 - MVP ✅
- [x] Workout generator with equipment and muscle selection
- [x] Basic exercise database with videos
- [x] User authentication and profiles
- [x] Basic statistics and progress tracking
- [x] Calorie and BMI calculators

### Phase 2 - Advanced Features 🚧
- [ ] Structured workout programs
- [ ] Advanced statistics with charts
- [ ] Heart rate zones and 1RM calculators
- [ ] Community leaderboard
- [ ] Mobile app (React Native)

### Phase 3 - Premium & Community 🎯
- [ ] Premium subscription with Stripe
- [ ] Advanced analytics and insights
- [ ] 1-on-1 coaching sessions
- [ ] Social features and sharing
- [ ] API for third-party integrations

### Phase 4 - Scale & Optimize 🚀
- [ ] Performance optimizations
- [ ] Advanced caching strategies
- [ ] Multi-region deployment
- [ ] Enterprise features
- [ ] White-label solutions

---

**Made with ❤️ by the Workout.cool community**
