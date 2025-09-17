'use client'

import { 
  Heart, 
  Github, 
  MessageCircle, 
  Mail, 
  Users, 
  Code, 
  BookOpen,
  Zap,
  Shield,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About GymGuy
          </h1>
          <p className="text-xl text-gray-600">
            Building the future of fitness, one workout at a time
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              GymGuy was born out of frustration with the abandonment of workout.lol, 
              a beloved fitness platform that helped thousands of people create and track their workouts. 
              When the original platform was discontinued, we saw an opportunity to build something better.
            </p>
            <p className="mb-4">
              Our mission is simple: provide a modern, actively maintained, and community-driven 
              alternative that puts users in control of their fitness journey. We believe that 
              fitness tools should be accessible, transparent, and always improving.
            </p>
            <p>
              What started as a passion project has grown into a comprehensive fitness platform 
              that serves thousands of users worldwide. We're committed to continuous improvement, 
              community feedback, and maintaining the open-source spirit that makes this project special.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Open Source</h3>
            <p className="text-gray-600">
              Always free and open source. You can inspect, modify, and self-host the entire platform.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Driven</h3>
            <p className="text-gray-600">
              Built by the community, for the community. Your feedback shapes our development.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Always Improving</h3>
            <p className="text-gray-600">
              Continuous updates, new features, and improvements based on user needs.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Team</h3>
              <p className="text-gray-600 mb-4">
                A passionate group of developers, designers, and fitness enthusiasts working 
                to make fitness accessible to everyone.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Code className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Full-stack development</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-gray-600">Fitness expertise</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">Global perspective</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Contributors</h3>
              <p className="text-gray-600 mb-4">
                Hundreds of community members who contribute code, report bugs, suggest features, 
                and help others in our community.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Github className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Code contributions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Documentation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">Community support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Partners</h2>
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fit'Distance</h3>
              <p className="text-gray-600">
                Our trusted partner for high-quality exercise demonstration videos. 
                Fit'Distance provides the visual content that helps users perform exercises 
                with proper form and technique.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.open('https://fitdistance.io', '_blank')}
            >
              Visit Fit'Distance
            </Button>
          </div>
        </div>

        {/* Get Involved Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Get Involved
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contribute Code</h3>
              <p className="text-gray-600 mb-4">
                Help us build new features, fix bugs, and improve the platform.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://github.com/workout-cool', '_blank')}
              >
                View on GitHub
              </Button>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Join Community</h3>
              <p className="text-gray-600 mb-4">
                Connect with other users, share tips, and get support.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://discord.gg/workout-cool', '_blank')}
              >
                Join Discord
              </Button>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Us</h3>
              <p className="text-gray-600 mb-4">
                Help us keep the project running and growing.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/premium'}
              >
                Go Premium
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-600">hello@gymguy.app</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-600">github.com/workout-cool</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-600">discord.gg/workout-cool</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
              <p className="text-gray-600 mb-4">
                Need help? Have a question? Want to report a bug? We're here to help!
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('mailto:hello@gymguy.app', '_blank')}
                >
                  Send Email
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://github.com/workout-cool/issues', '_blank')}
                >
                  Report Issue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
