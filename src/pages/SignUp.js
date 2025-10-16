import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import toast from 'react-hot-toast';
import CustomToast from '../components/CustomToast';
import AnimatedButton from '../components/AnimatedButton';

const initialState = { name: '', email: '', password: '' };

export default function SignUp() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const next = {};
    const nameParts = form.name.trim().split(/\s+/).filter(Boolean);
    if (!form.name || nameParts.length < 2) {
      next.name = 'Full name must be at least two words';
      toast.custom((t) => (
        <CustomToast 
          toast={t} 
          message="Full name must be at least two words" 
          type="error" 
        />
      ), {
        position: 'top-center',
        duration: 8000,
      });
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email';
      toast.custom((t) => (
        <CustomToast 
          toast={t} 
          message="Please enter a valid email" 
          type="error" 
        />
      ), {
        position: 'top-center',
        duration: 8000,
      });
    }
    const hasMinLen = (form.password || '').length >= 8;
    const hasUpper = /[A-Z]/.test(form.password || '');
    const hasLower = /[a-z]/.test(form.password || '');
    const hasNumber = /[0-9]/.test(form.password || '');
    const hasSpecial = /[^A-Za-z0-9]/.test(form.password || '');
    if (!hasMinLen || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      next.password = 'Password must be 8+ characters with uppercase, lowercase, number and special character';
      toast.custom((t) => (
        <CustomToast 
          toast={t} 
          message="Password must be 8+ characters with uppercase, lowercase, number and special character" 
          type="error" 
        />
      ), {
        position: 'top-center',
        duration: 8000,
      });
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSubmitting) return;
    
    // Clear previous errors before validation
    setErrors({});
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register({ fullName: form.name, email: form.email, password: form.password });
      toast.custom((t) => (
        <CustomToast 
          toast={t} 
          message="Registration successful" 
          type="success" 
        />
      ), {
        position: 'top-center',
        duration: 5000,
      });
      navigate('/');
    } catch (err) {
      toast.custom((t) => (
        <CustomToast 
          toast={t}
          message={err?.message || 'Registration failed'} 
          type="error" 
        />
      ), {
        position: 'top-center',
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-[100dvh] grid grid-cols-1 lg:[grid-template-columns:1fr_auto]" data-page-title="maglo - sign up">

      <div className="flex items-center justify-center px-8 py-6 lg:py-8">
        <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
          <div className="flex items-center gap-2 mb-8 lg:mb-12 xl:mb-16">
            <img src="/icons/auth/Logo.png" alt="Maglo" className="h-8" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">Create new account</h1>
          <p className="text-gray-500 mt-2">Create your account to get started</p>

          <label htmlFor="signup-name" className="block mt-8 text-sm font-medium text-gray-700">Full Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            disabled={isSubmitting || loading}
            id="signup-name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'signup-name-error' : undefined}
            className={`mt-2 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${errors.name ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-lime-300'} ${(isSubmitting || loading) ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            placeholder="Mahfuzul Nabil"
          />
          {errors.name && <p id="signup-name-error" className="text-sm text-red-600 mt-1">{errors.name}</p>}

          <label htmlFor="signup-email" className="block mt-5 text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={isSubmitting || loading}
            id="signup-email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'signup-email-error' : undefined}
            className={`mt-2 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-lime-300'} ${(isSubmitting || loading) ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            placeholder="example@gmail.com"
          />
          {errors.email && <p id="signup-email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>}

          <label htmlFor="signup-password" className="block mt-5 text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              disabled={isSubmitting || loading}
              id="signup-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'signup-password-error' : undefined}
              className={`mt-2 w-full rounded-lg border px-3 py-2 pr-10 outline-none focus:ring-2 ${errors.password ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-lime-300'} ${(isSubmitting || loading) ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              placeholder="•••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting || loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p id="signup-password-error" className="text-sm text-red-600 mt-1">{errors.password}</p>}

          <AnimatedButton
            type="submit"
            disabled={isSubmitting || loading}
            loading={isSubmitting || loading}
            loadingText="Creating Account..."
            className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg font-medium py-2.5 transition ${
              (isSubmitting || loading) 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-[#C8EE44] hover:brightness-95 text-gray-900'
            }`}
          >
            Create Account
          </AnimatedButton>

          <button type="button" className="mt-4 w-full rounded-lg border border-gray-300 py-2.5 text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <img src="/icons/auth/Google.svg" alt="Google" className="h-5" /> Sign up with google
          </button>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{' '}
            <span className="relative inline-block">
              <Link to="/signin" className="text-gray-900 font-medium">Sign in</Link>
              <img src="/icons/auth/Vector 11.svg" alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-2 select-none" />
            </span>
          </p>
        </form>
      </div>
      <div className="hidden lg:flex items-center justify-end bg-gray-50 lg:min-h-[100dvh]">
        <img src="/images/auth.jpg" alt="Authentication illustration" className="h-full max-h-[100dvh] w-auto object-contain object-right select-none" />
      </div>
    </div>
  );
}
