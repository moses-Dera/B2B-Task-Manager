import { useState } from 'react';
import {
  CheckCircle, Users, BarChart3, MessageSquare, Moon, Sun, ArrowRight,
  Trophy, Target, TrendingUp, Activity, Shield
} from 'lucide-react';
import Button from '../components/ui/Button';

export default function LandingPage({ onGetStarted, isDark, setIsDark }) {
  const features = [
    {
      icon: Activity,
      title: 'Smart Insights',
      description: 'Automated performance tracking that highlights top performers and identifies bottlenecks instantly.'
    },
    {
      icon: Trophy,
      title: 'Gamified Progress',
      description: 'Keep morale high with streaks, badges, and automated leaderboards that celebrate consistency.'
    },
    {
      icon: Users,
      title: 'Seamless Collaboration',
      description: 'Chat, assign tasks, and share files in one unified workspace. No more context switching.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade data isolation ensures your company\'s proprietary strategies remain private.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'VP of Operations',
      company: 'TechCorp',
      rating: 5,
      text: 'Finally, a tool that doesn’t just list tasks but actually tells me how my team is performing. We saw a 40% boost in engagement within month one.'
    },
    {
      name: 'Mike Chen',
      role: 'Team Lead',
      company: 'StartupXYZ',
      rating: 5,
      text: 'The gamification features changed the vibe of our team. Everyone wants to keep their "Green Streak" alive. It makes productivity fun.'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <header className="px-4 lg:px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">TaskFlow</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDark(isDark ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button onClick={onGetStarted} variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button onClick={onGetStarted}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 lg:px-6 py-20 lg:py-32">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            New: Automated Performance Grading
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            Elevate Your Team's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              Performance
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            The all-in-one workspace that turns completed tasks into measurable success.
            Stop managing to-do lists and start driving real results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={onGetStarted} size="lg" className="text-lg px-8 py-4 h-auto shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-shadow">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
              View Live Demo
            </Button>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 dark:border-gray-800 pt-8 max-w-4xl mx-auto">
            {[
              { label: 'Productivity Boost', value: '40%' },
              { label: 'Active Teams', value: '10k+' },
              { label: 'Tasks Completed', value: '1M+' },
              { label: 'Uptime', value: '99.9%' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="px-4 lg:px-6 py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                The "Visibility Gap" is holding you back.
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Flying Blind</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Standard tools list tasks but ignore effort. You don't know who is overwhelmed and who is underutilized until it's too late.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fragmented workflows</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Constantly switching between Slack, Jira, and spreadsheets kills flow state. Your team loses hours every week just context switching.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Abstract visual representation of dashboard (CSS only) */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform rotate-6 rounded-2xl opacity-20 blur-xl"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 font-bold">A+</div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 bg-gray-100 dark:bg-gray-700 rounded"></div>
                        <div className="h-2 w-1/2 bg-gray-100 dark:bg-gray-700 rounded"></div>
                      </div>
                      <div className="w-16 h-6 bg-blue-50 dark:bg-blue-900/20 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 lg:px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              More than just a checklist.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We've rebuilt the modern workspace from the ground up to focus on what matters most: Impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group hover:-translate-y-2 transition-transform duration-300 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary/20 transition-colors rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gamification Highlight */}
      <section className="px-4 lg:px-6 py-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 mb-8">
            <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="font-medium text-blue-100">Gamification Engine</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Make Work Addictive (In a Good Way)
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Turn mundane tasks into a rewarding experience. Our built-in streak systems and achievement badges ensure your team stays motivated to clear their board every single day.
          </p>

          <div className="flex justify-center gap-8 flex-wrap">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">Goal Crusher</div>
                <div className="text-sm text-blue-200">Badge Earned</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">7 Day Streak</div>
                <div className="text-sm text-blue-200">Active Now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 lg:px-6 py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by High-Performing Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Trophy key={i} className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-8 text-xl font-medium leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 text-white font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</p>
                    <p className="text-gray-500 dark:text-gray-400">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 lg:px-6 py-32 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto bg-primary rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to elevate your team?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of data-driven managers who are transforming their workplace culture today.
            </p>
            <Button onClick={onGetStarted} variant="outline" size="lg" className="bg-white text-primary hover:bg-blue-50 text-lg px-10 py-5 border-none shadow-xl">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="mt-6 text-sm text-blue-200">No credit card required · 14-day free trial</p>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 lg:px-6 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">TaskFlow</span>
          </div>
          <div className="flex space-x-8 text-gray-500 dark:text-gray-400 text-sm">
            <a href="#" className="hover:text-primary transition-colors">Features</a>
            <a href="#" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
            © 2024 TaskFlow Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}