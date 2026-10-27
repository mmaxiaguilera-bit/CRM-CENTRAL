"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCRM } from '@/context/crm-context'
import { LayoutStyle } from '@/types/crm'
import { 
  BarChart3, Trello, Users, Calendar, DollarSign, Clock, 
  Megaphone, UserCheck, CheckSquare, Sparkles, Layout,
  SlidersHorizontal, ChevronRight, Activity, Target
} from 'lucide-react'
import { CRMHeader } from '@/components/layout/crm-header'

export function CRMShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { layoutStyle, setLayoutStyle, mode, setMode, metricasLite, leads, agendas, ventas, seguimientos, clientes, tareas, isConfigured, supabaseConnected } = useCRM()

  const navItems = mode === 'pro' ? [
    { href: '/', label: 'Dirección Pro', icon: BarChart3 },
    { href: '/pipeline', label: 'Pipeline', icon: Trello },
    { href: '/leads', label: `Leads (${leads.length})`, icon: Users },
    { href: '/agendas', label: `Agendas (${agendas.length})`, icon: Calendar },
    { href: '/ventas', label: `Ventas (${ventas.length})`, icon: DollarSign },
    { href: '/seguimientos', label: `Seguimientos (${seguimientos.filter(s => s.estado === 'pendiente').length})`, icon: Clock },
    { href: '/marketing', label: 'Marketing', icon: Megaphone },
    { href: '/clientes', label: `Clientes (${clientes.length})`, icon: UserCheck },
    { href: '/operaciones', label: `Operaciones (${tareas.filter(t => t.estado !== 'completado').length})`, icon: CheckSquare },
  ] : [
    { href: '/', label: 'Dirección Lite', icon: BarChart3 },
    { href: '/pipeline', label: 'Pipeline', icon: Trello },
    { href: '/leads', label: `Leads (${leads.length})`, icon: Users },
    { href: '/agendas', label: `Agendas (${agendas.length})`, icon: Calendar },
    { href: '/ventas', label: `Ventas (${ventas.length})`, icon: DollarSign },
    { href: '/seguimientos', label: `Seguimientos (${seguimientos.filter(s => s.estado === 'pendiente').length})`, icon: Clock },
  ]

  // Meta mensual ficticia estándar ($10,000 USD) para HUD del Cockpit
  const metaMensual = 10000
  const pctMeta = Math.min(100, Math.round((metricasLite.cashCollected / metaMensual) * 100))

  // =========================================================================
  // LAYOUT 3: SIDEBAR CRM (SaaS Clásico con barra fija a la izquierda)
  // =========================================================================
  if (layoutStyle === 'sidebar') {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex">
        {/* SIDEBAR FIJA A LA IZQUIERDA */}
        <aside className="w-64 border-r border-slate-800 bg-[#0d131f] flex flex-col fixed inset-y-0 z-40">
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-sm">
                EX
              </div>
              <div>
                <div className="font-bold text-sm text-white tracking-tight leading-none">Exposure CRM</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Sidebar Edition</div>
              </div>
            </Link>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
              mode === 'pro' ? 'bg-purple-500/10 text-purple-400' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              {mode}
            </span>
          </div>

          {/* SELECTOR DE ESTILO EN SIDEBAR */}
          <div className="px-3 py-2 border-b border-slate-800/60 bg-slate-900/40">
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Estilo Visual:
            </label>
            <select
              value={layoutStyle}
              onChange={e => setLayoutStyle(e.target.value as LayoutStyle)}
              className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none"
            >
              <option value="minimal">Minimal (Notion/Linear)</option>
              <option value="cards">Cards Dashboard</option>
              <option value="sidebar">Sidebar CRM</option>
              <option value="cockpit">Cockpit (Command Center)</option>
              <option value="kanban">Kanban + Metrics</option>
            </select>
          </div>

          {/* LINKS DE NAVEGACIÓN EN COLUMNA */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive 
                      ? "bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20" 
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* FOOTER DEL SIDEBAR */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-900/30 text-[11px] space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span>Modo CRM:</span>
              <div className="flex rounded bg-slate-950 p-0.5 border border-slate-800">
                <button
                  onClick={() => setMode('lite')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${mode === 'lite' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}
                >
                  Lite
                </button>
                <button
                  onClick={() => setMode('pro')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${mode === 'pro' ? 'bg-purple-600 text-white' : 'text-slate-500'}`}
                >
                  Pro
                </button>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 text-center">
              Cash: <span className="text-emerald-400 font-bold">$${metricasLite.cashCollected}</span>
            </div>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL A LA DERECHA */}
        <div className="flex-1 pl-64 flex flex-col min-w-0">
          <main className="flex-1 p-2">
            {children}
          </main>
        </div>
      </div>
    )
  }

  // =========================================================================
  // LAYOUT 4: COCKPIT / COMMAND CENTER (Look Exposuriano futurista con HUD)
  // =========================================================================
  if (layoutStyle === 'cockpit') {
    return (
      <div className="min-h-screen bg-[#070a10] text-slate-100 flex flex-col font-sans">
        {/* HUD SUPERIOR DE METAS Y ESTADO DE COMANDO */}
        <div className="bg-[#0b101c] border-b border-emerald-500/20 px-6 py-2 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold text-[11px]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>COMMAND CENTER ACTIVE</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Meta Mensual ($10,000 USD):</span>
              <div className="w-28 bg-slate-900 border border-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${pctMeta}%` }} 
                />
              </div>
              <span className="font-mono text-emerald-400 font-bold">{pctMeta}%</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
              <Target className="h-3.5 w-3.5 text-purple-400" />
              <span>Pipeline: <b className="text-amber-400">$${metricasLite.pipelineAbierto}</b></span>
            </div>
            <span className="text-slate-600">|</span>
            {/* SELECTOR DE ESTILO */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-slate-400">Layout:</span>
              <select
                value={layoutStyle}
                onChange={e => setLayoutStyle(e.target.value as LayoutStyle)}
                className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-[11px] text-emerald-400 font-semibold focus:outline-none"
              >
                <option value="cockpit">Cockpit (Command Center)</option>
                <option value="minimal">Minimal (Notion/Linear)</option>
                <option value="cards">Cards Dashboard</option>
                <option value="sidebar">Sidebar CRM</option>
                <option value="kanban">Kanban + Metrics</option>
              </select>
            </div>
          </div>
        </div>

        <CRMHeader />
        <main className="flex-1">
          {children}
        </main>
      </div>
    )
  }

  // =========================================================================
  // LAYOUT 1: MINIMAL (Linear / Notion Moderno con aire y tipografía pura)
  // =========================================================================
  if (layoutStyle === 'minimal') {
    return (
      <div className="min-h-screen bg-[#080808] text-neutral-200 flex flex-col font-sans antialiased">
        {/* BARRA SUPERIOR ULTRA MINIMALISTA */}
        <header className="border-b border-neutral-800/80 px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold tracking-tight text-white hover:text-neutral-300 transition">
              Exposure CRM <span className="text-[10px] text-neutral-500 font-normal">/ minimal</span>
            </Link>
            {isConfigured && supabaseConnected ? (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                Supabase conectado
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Modo demo
              </span>
            )}
            <div className="flex items-center gap-1 border-l border-neutral-800 pl-4">
              {navItems.map(item => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2.5 py-1 rounded text-xs transition ${
                      isActive ? "text-white font-semibold bg-neutral-900" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={layoutStyle}
              onChange={e => setLayoutStyle(e.target.value as LayoutStyle)}
              className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-300 focus:outline-none"
            >
              <option value="minimal">Minimal</option>
              <option value="cards">Cards</option>
              <option value="sidebar">Sidebar</option>
              <option value="cockpit">Cockpit</option>
              <option value="kanban">Kanban + Metrics</option>
            </select>
            <button
              onClick={() => setMode(mode === 'lite' ? 'pro' : 'lite')}
              className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-semibold"
            >
              Modo: {mode.toUpperCase()}
            </button>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto p-6">
          {children}
        </main>
      </div>
    )
  }

  // =========================================================================
  // LAYOUT 5: KANBAN + METRICS (Foco en ventas con panel lateral de embudo)
  // =========================================================================
  if (layoutStyle === 'kanban') {
    return (
      <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col font-sans">
        <CRMHeader />

        {/* BARRA SUPERIOR DE SELECTOR Y CONVERSIÓN */}
        <div className="bg-slate-900/60 border-b border-slate-800 px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Trello className="h-4 w-4 text-emerald-400" />
              Modo Kanban Comercial:
            </span>
            <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
              <span>Agendas: <b className="text-purple-400">{metricasLite.totalAgendas}</b></span>
              <span>•</span>
              <span>Shows: <b className="text-emerald-400">{metricasLite.showRate}%</b></span>
              <span>•</span>
              <span>Cierre: <b className="text-cyan-400">{metricasLite.closeRate}%</b></span>
              <span>•</span>
              <span>Caja: <b className="text-emerald-400">$${metricasLite.cashCollected}</b></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              href="/pipeline" 
              className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 rounded text-xs transition"
            >
              Ir al Tablero Pipeline
            </Link>
            <select
              value={layoutStyle}
              onChange={e => setLayoutStyle(e.target.value as LayoutStyle)}
              className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:outline-none"
            >
              <option value="kanban">Kanban + Metrics</option>
              <option value="minimal">Minimal</option>
              <option value="cards">Cards</option>
              <option value="sidebar">Sidebar</option>
              <option value="cockpit">Cockpit</option>
            </select>
          </div>
        </div>

        <main className="flex-1">
          {children}
        </main>
      </div>
    )
  }

  // =========================================================================
  // LAYOUT 2: CARDS (Dashboard modular basado en tarjetas y bloques)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      <CRMHeader />
      <div className="max-w-7xl mx-auto w-full px-6 pt-3 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1.5">
          <Layout className="h-3.5 w-3.5 text-blue-400" />
          Vista Modular Cards
        </span>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-[11px]">Estilo:</span>
          <select
            value={layoutStyle}
            onChange={e => setLayoutStyle(e.target.value as LayoutStyle)}
            className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-xs text-white focus:outline-none"
          >
            <option value="cards">Cards Dashboard</option>
            <option value="minimal">Minimal</option>
            <option value="sidebar">Sidebar CRM</option>
            <option value="cockpit">Cockpit</option>
            <option value="kanban">Kanban + Metrics</option>
          </select>
        </div>
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
