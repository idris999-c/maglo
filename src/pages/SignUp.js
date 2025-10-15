import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const initialState = { name: '', email: '', password: '' };

export default function SignUp() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name || form.name.trim().split(' ').length < 1) next.name = 'Ad Soyad gerekli';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Geçerli bir e‑posta girin';
    if (!form.password || form.password.length < 6) next.password = 'Şifre en az 6 karakter';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await login({ name: form.name, email: form.email, password: form.password });
    navigate('/');
  };

  return (
    <div className="min-h-[100dvh] grid grid-cols-1 lg:[grid-template-columns:1fr_auto]" data-page-title="maglo - sign up">

      <div className="flex items-center justify-center px-8 py-10">
        <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
          <div className="flex items-center gap-2 mb-12 md:mb-24">
            <img src="/icons/auth/Logo.png" alt="Maglo" className="h-8" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">Create new account</h1>
          <p className="text-gray-500 mt-2">Welcome back! Please enter your details</p>

          <label htmlFor="signup-name" className="block mt-8 text-sm font-medium text-gray-700">Full Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            id="signup-name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'signup-name-error' : undefined}
            className={`mt-2 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${errors.name ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-lime-300'}`}
            placeholder="Mahfuzul Nabil"
          />
          {errors.name && <p id="signup-name-error" className="text-sm text-red-600 mt-1">{errors.name}</p>}

          <label htmlFor="signup-email" className="block mt-5 text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            id="signup-email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'signup-email-error' : undefined}
            className={`mt-2 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-lime-300'}`}
            placeholder="example@gmail.com"
          />
          {errors.email && <p id="signup-email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>}

          <label htmlFor="signup-password" className="block mt-5 text-sm font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            id="signup-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'signup-password-error' : undefined}
            className={`mt-2 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${errors.password ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-lime-300'}`}
            placeholder="•••••••"
          />
          {errors.password && <p id="signup-password-error" className="text-sm text-red-600 mt-1">{errors.password}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#C8EE44] hover:brightness-95 text-gray-900 font-medium py-2.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && (
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            <span>{loading ? 'Hesap oluşturuluyor…' : 'Create Account'}</span>
          </button>

          <button type="button" disabled className="mt-4 w-full rounded-lg border border-gray-300 py-2.5 text-gray-700 flex items-center justify-center gap-2">
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
        <img src="/images/auth.jpg" alt="Auth görseli" className="h-full max-h-[100dvh] w-auto object-contain object-right select-none" />
      </div>
    </div>
  );
}


