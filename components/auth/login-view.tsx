"use client"

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, Database } from 'lucide-react'

interface LoginViewProps {
  onSuccess?: () => void
}

export function LoginView({ onSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return

    setLoading(true)
    setErrorMsg(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrorMsg('Email o contraseña incorrectos. Verificá que el usuario exista en tu panel de Supabase.')
        } else {
          setErrorMsg(error.message)
        }
      } else if (data.session) {
        if (onSuccess) onSuccess()
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error de conexión. Intentá nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070a10] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 text-emerald-400 font-extrabold text-2xl shadow-xl shadow-emerald-500/10 mb-4">
            EX
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Exposure CRM</h1>
          <p className="text-xs text-slate-400 mt-1">Template oficial para alumnos</p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-300">
            <Database className="h-3 w-3 text-emerald-400" />
            <span>Supabase Conectado • Acceso Seguro</span>
          </div>
        </div>

        <div className="bg-[#0d131f]/90 border border-slate-800 rounded-2xl p-7 shadow-2xl backdrop-blur-md">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Iniciar sesión</h2>
            <p className="text-xs text-slate-400 mt-1">
              Ingresá con el usuario de tu equipo creado en Supabase (Authentication → Users).
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email de acceso
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@tunegocio.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>Ingresar al CRM</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>Acceso protegido por Supabase Auth y Row Level Security.</span>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          ¿Primer ingreso? Creá tu usuario en tu panel de Supabase en 
          <span className="text-slate-400 font-mono text-[11px]"> Authentication → Users → Add user</span>.
        </div>
      </div>
    </div>
  )
}
