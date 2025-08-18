import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Eye, EyeOff, Lock, User, Leaf, Heart, Info, ChevronRight, ArrowRight, LogIn } from 'lucide-react';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://10.5.50.48:41300/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username, password: formData.password })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ text: 'Login successful! Redirecting to dashboard...', type: 'success' });
        
        // Store token
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('userData', JSON.stringify(data.data.user));
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setMessage({ text: data.message || 'Login failed', type: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setFormData({
      username: 'admin',
      password: 'admin123'
    });
  };

  // Auto-remove message after 6 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen relative overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="absolute w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[10%] w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-10 animate-[float_20s_infinite_linear]"></div>
        <div className="absolute top-[60%] right-[15%] w-30 h-30 bg-gradient-to-r from-yellow-500 to-red-500 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-10 animate-[float_20s_infinite_linear_-5s]"></div>
        <div className="absolute bottom-[20%] left-[20%] w-15 h-15 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-10 animate-[float_20s_infinite_linear_-10s]"></div>
      </div>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8">
          {/* Enhanced Logo and Header */}
          <div className="text-center animate-[slideUp_0.8s_ease-out]">
            <div className="mx-auto h-24 w-24 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl animate-[bounceGentle_2s_infinite]">
              <Leaf className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Pharmacy POS
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Welcome back to your dashboard
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to access your pharmacy management system
            </p>
          </div>

          {/* Enhanced Login Form Card */}
          <div className="bg-white/95 backdrop-blur-[20px] border border-white/20 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                  <User className="inline w-4 h-4 mr-2 text-blue-500" />
                  Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-400 text-base focus:-translate-y-0.5 focus:shadow-lg focus:shadow-blue-500/15"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  <Lock className="inline w-4 h-4 mr-2 text-blue-500" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-400 text-base focus:-translate-y-0.5 focus:shadow-lg focus:shadow-blue-500/15"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-gray-600 transition-colors p-0 h-auto"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                  />
                  <Label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 font-medium">
                    Remember me
                  </Label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Enhanced Login Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LogIn className="w-5 h-5 text-blue-200 group-hover:text-blue-100 transition-colors" />
                  </span>
                  <span className="flex items-center">
                    {isLoading ? 'Signing In...' : 'Sign In'}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </form>

            {/* Enhanced Demo Credentials */}
            <div
              className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group"
              onClick={fillDemoCredentials}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Info className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-semibold text-blue-800 group-hover:text-blue-900 transition-colors">
                    Demo Credentials
                  </h3>
                  <div className="mt-2 text-sm text-blue-700 space-y-1">
                    <p><strong>Username:</strong> admin</p>
                    <p><strong>Password:</strong> admin123</p>
                  </div>
                  <p className="text-xs text-blue-600 mt-2 italic">
                    Click to auto-fill credentials
                  </p>
                </div>
                <div className="ml-2">
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="text-center animate-[slideUp_0.8s_ease-out]" style={{ animationDelay: '0.2s' }}>
            <p className="text-sm text-gray-600 mb-4">
              Or continue with
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-4 h-4 mr-2 text-blue-500 group-hover:scale-110 transition-transform">📊</div>
                View Dashboard
              </a>
              <a
                href="http://10.5.50.48:48080"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-4 h-4 mr-2 text-green-500 group-hover:scale-110 transition-transform">🗄️</div>
                Database Admin
              </a>
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="text-center text-xs text-gray-500 mt-8 animate-[fadeIn_0.6s_ease-in-out]" style={{ animationDelay: '0.4s' }}>
            <p className="mb-2">&copy; 2024 Pharmacy POS System</p>
            <p className="flex items-center justify-center gap-2">
              <span>Built with</span>
              <Heart className="w-3 h-3 text-red-500 animate-[pulseGentle_2s_infinite]" />
              <span>for Thai Pharmacies</span>
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-[fadeIn_0.6s_ease-in-out]">
          <div className="bg-white/95 backdrop-blur-[20px] rounded-2xl p-8 flex flex-col items-center space-y-4 shadow-2xl border border-white/20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-green-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">Signing in...</p>
              <p className="text-sm text-gray-600">Please wait while we authenticate you</p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Success/Error Messages */}
      {message && (
        <div className="fixed top-6 right-6 z-50 animate-[fadeIn_0.6s_ease-in-out]">
          <div className={`bg-white/95 backdrop-blur-[20px] px-6 py-4 rounded-xl shadow-xl max-w-sm border-l-4 ${
            message.type === 'success' 
              ? 'border-green-500' 
              : 'border-red-500'
          }`}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className={`w-5 h-5 ${
                  message.type === 'success' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {message.type === 'success' ? '✓' : '⚠'}
                </div>
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  message.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {message.text}
                </p>
              </div>
              <div className="ml-auto pl-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600 p-0 h-auto"
                  onClick={() => setMessage(null)}
                >
                  ×
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
