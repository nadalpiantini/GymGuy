#!/usr/bin/env node

/**
 * Database Setup Script
 * This script helps set up the database with migrations and seed data
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 GymGuy Database Setup');
console.log('========================\n');

// Check if Supabase CLI is installed
function checkSupabaseCLI() {
  try {
    require('child_process').execSync('supabase --version', { stdio: 'pipe' });
    console.log('✅ Supabase CLI is installed');
    return true;
  } catch (error) {
    console.log('❌ Supabase CLI is not installed');
    console.log('   Install it with: npm install -g supabase');
    return false;
  }
}

// Display migration instructions
function displayMigrationInstructions() {
  console.log('\n📋 Database Migration Instructions:');
  console.log('=====================================\n');
  
  console.log('1. Supabase Dashboard Method (Recommended):');
  console.log('   - Go to your Supabase project dashboard');
  console.log('   - Navigate to SQL Editor');
  console.log('   - Copy and paste the content from: supabase/migrations/001_initial_schema.sql');
  console.log('   - Execute the SQL');
  console.log('   - Copy and paste the content from: supabase/seed.sql');
  console.log('   - Execute the SQL\n');
  
  console.log('2. Supabase CLI Method:');
  console.log('   - Run: supabase login');
  console.log('   - Run: supabase link --project-ref YOUR_PROJECT_REF');
  console.log('   - Run: supabase db push\n');
  
  console.log('3. Manual SQL Execution:');
  console.log('   - Copy the SQL files to your database management tool');
  console.log('   - Execute them in order\n');
}

// Display environment setup instructions
function displayEnvInstructions() {
  console.log('\n🔧 Environment Variables Setup:');
  console.log('================================\n');
  
  console.log('1. Create .env.local file in the project root');
  console.log('2. Add the following variables:\n');
  
  const envTemplate = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration (for premium features)
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000`;
  
  console.log(envTemplate);
  console.log('\n3. Replace the placeholder values with your actual credentials');
}

// Display deployment instructions
function displayDeploymentInstructions() {
  console.log('\n🚀 Deployment Instructions:');
  console.log('============================\n');
  
  console.log('Vercel Deployment:');
  console.log('1. Push your code to GitHub');
  console.log('2. Connect your repository to Vercel');
  console.log('3. Add environment variables in Vercel dashboard');
  console.log('4. Deploy automatically\n');
  
  console.log('Netlify Deployment:');
  console.log('1. Connect your GitHub repository to Netlify');
  console.log('2. Set build command: npm run build');
  console.log('3. Set publish directory: .next');
  console.log('4. Add environment variables in Netlify dashboard\n');
  
  console.log('Manual Deployment:');
  console.log('1. Run: npm run build');
  console.log('2. Run: npm start');
  console.log('3. Configure reverse proxy (nginx/Apache) for SSL');
}

// Main execution
function main() {
  const hasSupabaseCLI = checkSupabaseCLI();
  
  displayMigrationInstructions();
  displayEnvInstructions();
  displayDeploymentInstructions();
  
  console.log('\n✅ Setup instructions completed!');
  console.log('📖 For detailed instructions, see: deployment-config.md');
  console.log('📖 For deployment guide, see: DEPLOYMENT.md\n');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  checkSupabaseCLI,
  displayMigrationInstructions,
  displayEnvInstructions,
  displayDeploymentInstructions
};
