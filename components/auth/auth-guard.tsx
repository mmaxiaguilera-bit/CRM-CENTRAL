"use client"

import React, { useEffect, useState } from 'react'
import { supabase, isConfigured } from '@/lib/supabase'
import { LoginView } from '@/components/auth/login-view'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [sessionUser, setSessionUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(isConfigured)

  useEffect(() => {
    if (!isConfigured || !supabase) {
      setIsLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessionUser(session?.user ?? null)
      setIsLoading(false)
    }).catch(() => {
      setIsLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (!isConfigured) {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070a10] flex flex-col items-center justify-center font-sans">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-lg mb-4">
          EX
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="h-3 w-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span>Verificando sesión segura...</span>
        </div>
      </div>
    )
  }

  if (!sessionUser) {
    return <LoginView />
  }

  return <>{children}</>
}
