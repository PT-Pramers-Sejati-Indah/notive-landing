import React, { useState, useEffect } from 'react'
import notiveLogo from './assets/notive-logo.png'

interface RegisterProps {
  onBackToHome: () => void
}

export function Register({ onBackToHome }: RegisterProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(false)

  // Validation states
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    let intervalId: any
    let widgetId: string | null = null

    const renderWidget = () => {
      if ((window as any).turnstile) {
        try {
          const container = document.getElementById('turnstile-container')
          if (container && !container.innerHTML) {
            widgetId = (window as any).turnstile.render('#turnstile-container', {
              sitekey: '0x4AAAAAAD8IMAII6s92ow_2',
              action: 'turnstile-spin-v2',
            })
          }
          if (intervalId) clearInterval(intervalId)
        } catch (e) {
          console.error('Turnstile render error:', e)
        }
      }
    }

    if ((window as any).turnstile) {
      renderWidget()
    } else {
      intervalId = setInterval(renderWidget, 100)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
      if (widgetId && (window as any).turnstile) {
        try {
          (window as any).turnstile.remove(widgetId)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '') // only digits
    if (value.startsWith('62')) {
      value = value.substring(2)
    }
    if (value.startsWith('0')) {
      value = value.substring(1)
    }
    setPhone(value)
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }))
    }
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (!name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi'
    }

    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Format email tidak valid'
    }

    if (!phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi'
    } else if (phone.length < 5 || phone.length > 14) {
      newErrors.phone = 'Nomor telepon harus antara 5-14 digit'
    }

    if (!password) {
      newErrors.password = 'Password wajib diisi'
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password tidak cocok'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!validate()) return

    const tokenEl = document.getElementsByName('cf-turnstile-response')[0] as HTMLInputElement
    const turnstileToken = tokenEl ? tokenEl.value : ''

    if (!turnstileToken) {
      setErrorMsg('Silakan verifikasi bahwa Anda bukan robot.')
      return
    }

    setLoading(true)
    const formattedPhoneNumber = `+62${phone}`

    try {
      const response = await fetch('https://api.notive.id/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          phoneNumber: formattedPhoneNumber,
          turnstileToken,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Pendaftaran gagal. Silakan coba lagi.')
      }

      setSuccess(true)
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan koneksi.')
      if ((window as any).turnstile) {
        try {
          (window as any).turnstile.reset()
        } catch (e) {
          console.error(e)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[oklch(98.6%_0.004_258)] p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[oklch(91%_0.008_258)] p-8 text-center animate-fade-in">
          <div className="w-16 h-16 bg-[oklch(95%_0.05_152)] text-[oklch(42%_0.13_152)] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[oklch(24%_0.03_258)] mb-3">
            Pendaftaran Berhasil!
          </h2>
          <p className="text-[oklch(43%_0.022_258)] mb-8 leading-relaxed">
            Akun kantor notaris Anda telah berhasil dibuat. Silakan masuk ke dashboard untuk memulai manajemen order.
          </p>
          <a
            href="https://dashboard.notive.id/login"
            className="w-full inline-flex items-center justify-center bg-[oklch(47%_0.17_258)] hover:bg-[oklch(40%_0.15_258)] !text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm"
            style={{ color: '#ffffff' }}
          >
            Masuk ke Dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[oklch(98.6%_0.004_258)] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[oklch(91%_0.008_258)] p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <button
            onClick={onBackToHome}
            className="self-start flex items-center text-sm font-medium text-[oklch(43%_0.022_258)] hover:text-[oklch(47%_0.17_258)] mb-6 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Kembali ke Beranda
          </button>

          <img className="mb-3" src={notiveLogo} width={48} height={48} alt="Notive" />
          <h2 className="text-2xl font-bold text-[oklch(24%_0.03_258)]">Daftarkan Kantor Anda!</h2>
          <p className="text-sm text-[oklch(43%_0.022_258)] mt-1">Mulai uji coba 30 hari gratis Anda</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-[oklch(95%_0.05_25)] border border-[oklch(90%_0.08_25)] text-[oklch(56%_0.19_25)] rounded-xl text-sm leading-relaxed">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-[oklch(24%_0.03_258)] uppercase tracking-wider mb-2">
              Nama Kantor Notaris
            </label>
            <input
              type="text"
              placeholder="Contoh: Agung Sudaloyo"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
              }}
              className={`w-full px-4 py-3 rounded-xl border bg-[oklch(98.6%_0.004_258)] text-[oklch(24%_0.03_258)] focus:outline-none focus:ring-2 transition-all ${errors.name
                ? 'border-[oklch(56%_0.19_25)] focus:ring-[oklch(95%_0.05_25)]'
                : 'border-[oklch(91%_0.008_258)] focus:ring-[oklch(92%_0.035_258)] focus:border-[oklch(47%_0.17_258)]'
                }`}
            />
            {errors.name && <p className="text-xs text-[oklch(56%_0.19_25)] mt-1.5">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[oklch(24%_0.03_258)] uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="kantor@notaris.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
              }}
              className={`w-full px-4 py-3 rounded-xl border bg-[oklch(98.6%_0.004_258)] text-[oklch(24%_0.03_258)] focus:outline-none focus:ring-2 transition-all ${errors.email
                ? 'border-[oklch(56%_0.19_25)] focus:ring-[oklch(95%_0.05_25)]'
                : 'border-[oklch(91%_0.008_258)] focus:ring-[oklch(92%_0.035_258)] focus:border-[oklch(47%_0.17_258)]'
                }`}
            />
            {errors.email && <p className="text-xs text-[oklch(56%_0.19_25)] mt-1.5">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-[oklch(24%_0.03_258)] uppercase tracking-wider mb-2">
              Nomor Telepon
            </label>
            <div
              className={`flex items-stretch rounded-xl border bg-[oklch(98.6%_0.004_258)] overflow-hidden focus-within:ring-2 transition-all ${errors.phone
                ? 'border-[oklch(56%_0.19_25)] focus-within:ring-[oklch(95%_0.05_25)]'
                : 'border-[oklch(91%_0.008_258)] focus-within:ring-[oklch(92%_0.035_258)] focus-within:border-[oklch(47%_0.17_258)]'
                }`}
            >
              <div className="flex items-center px-3 bg-[oklch(95.4%_0.01_258)] border-r border-[oklch(91%_0.008_258)] select-none">
                <span className="mr-1.5" role="img" aria-label="Indonesia Flag">
                  🇮🇩
                </span>
                <span className="text-sm font-semibold text-[oklch(43%_0.022_258)]">+62</span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="ex: 873636"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-3 bg-transparent text-[oklch(24%_0.03_258)] focus:outline-none"
              />
            </div>
            {errors.phone && <p className="text-xs text-[oklch(56%_0.19_25)] mt-1.5">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-[oklch(24%_0.03_258)] uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }))
                }}
                className={`w-full pl-4 pr-12 py-3 rounded-xl border bg-[oklch(98.6%_0.004_258)] text-[oklch(24%_0.03_258)] focus:outline-none focus:ring-2 transition-all ${errors.password
                  ? 'border-[oklch(56%_0.19_25)] focus:ring-[oklch(95%_0.05_25)]'
                  : 'border-[oklch(91%_0.008_258)] focus:ring-[oklch(92%_0.035_258)] focus:border-[oklch(47%_0.17_258)]'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[oklch(43%_0.022_258)] hover:text-[oklch(24%_0.03_258)] transition-colors p-1"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="text-xs text-[oklch(56%_0.19_25)] mt-1.5">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-[oklch(24%_0.03_258)] uppercase tracking-wider mb-2">
              Ulangi Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }))
                }}
                className={`w-full pl-4 pr-12 py-3 rounded-xl border bg-[oklch(98.6%_0.004_258)] text-[oklch(24%_0.03_258)] focus:outline-none focus:ring-2 transition-all ${errors.confirmPassword
                  ? 'border-[oklch(56%_0.19_25)] focus:ring-[oklch(95%_0.05_25)]'
                  : 'border-[oklch(91%_0.008_258)] focus:ring-[oklch(92%_0.035_258)] focus:border-[oklch(47%_0.17_258)]'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[oklch(43%_0.022_258)] hover:text-[oklch(24%_0.03_258)] transition-colors p-1"
                aria-label={showConfirmPassword ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'}
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-[oklch(56%_0.19_25)] mt-1.5">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Turnstile Widget */}
          <div
            id="turnstile-container"
            className="cf-turnstile flex justify-center my-3"
            data-sitekey="0x4AAAAAAD8IMAII6s92ow_2"
            data-action="turnstile-spin-v2"
          ></div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-[oklch(47%_0.17_258)] hover:bg-[oklch(40%_0.15_258)] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Daftar Sekarang'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
