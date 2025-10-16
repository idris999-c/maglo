import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import toast from 'react-hot-toast';
import CustomToast from '../components/CustomToast';

const initialState = { email: '', password: '' };

export default function SignIn() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, isAuthenticated } = useAuth();
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
    if (!form.password || form.password.length < 6) {
      next.password = 'Password must be at least 6 characters';
      toast.custom((t) => (
        <CustomToast 
          toast={t} 
          message="Password must be at least 6 characters" 
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
    
    console.log('Form submitted, validating...');
    
    // Clear previous errors
    setErrors({});
    
    if (!validate()) {
      console.log('Validation failed, showing error toasts');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login({ email: form.email, password: form.password });
      toast.custom((t) => (
        <CustomToast 
          toast={t} 
          message="Login successful" 
          type="success" 
        />
      ), {
        position: 'top-center',
        duration: 6000,
      });
      navigate('/');
    } catch (err) {
      toast.custom((t) => (
        <CustomToast 
          toast={t}
          message={err?.message || 'Login failed'} 
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

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-[#C8EE44]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] grid grid-cols-1 lg:[grid-template-columns:1fr_auto]" data-page-title="maglo - sign in">

      <div className="flex items-center justify-center px-8 py-6 lg:py-8">
        <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
          <div className="flex items-center gap-2 mb-8 lg:mb-12 xl:mb-16">
            <img src="/icons/auth/Logo.png" alt="Maglo" className="h-8" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">Sign In</h1>
          <p className="text-gray-500 mt-2">Welcome back! Please enter your details</p>

          <label htmlFor="signin-email" className="block mt-8 text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={isSubmitting || loading}
            id="signin-email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'signin-email-error' : undefined}
            className={`mt-2 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-lime-300'} ${(isSubmitting || loading) ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            placeholder="example@gmail.com"
          />
          {errors.email && <p id="signin-email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>}

          <label htmlFor="signin-password" className="block mt-5 text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              disabled={isSubmitting || loading}
              id="signin-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'signin-password-error' : undefined}
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
          {errors.password && <p id="signin-password-error" className="text-sm text-red-600 mt-1">{errors.password}</p>}

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg font-medium py-2.5 transition ${
              (isSubmitting || loading) 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-[#C8EE44] hover:brightness-95 text-gray-900'
            }`}
          >
            {isSubmitting || loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          <button type="button" disabled className="mt-4 w-full rounded-lg border border-gray-300 py-2.5 text-gray-700 flex items-center justify-center gap-2">
            <img src="/icons/auth/Google.svg" alt="Google" className="h-5" /> Sign in with google
          </button>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{' '}
            <span className="relative inline-block">
              <Link to="/signup" className="text-gray-900 font-medium">Sign up</Link>
              <img src="/icons/auth/Vector 11.svg" alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-2 select-none" />
            </span>
          </p>
        </form>
      </div>
      <div className="hidden lg:flex items-center justify-end bg-gray-50 lg:min-h-[100dvh]">
        <img src="/images/auth.jpg" alt="Auth görseli" className="h-full max-h-[100dvh] w-auto object-contain object-right select-none" />
      </div>
    </div>
  );
}


