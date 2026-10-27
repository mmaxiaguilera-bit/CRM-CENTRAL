"use client"

import { useState } from 'react'
import { useCRM } from '@/context/crm-context'
import { Megaphone, DollarSign, TrendingUp, Users, Calendar, ArrowUpRight } from 'lucide-react'

export default function MarketingPage() {
  const { metricasPro, inversionAds, setInversionAds } = useCRM()
  const [inversionInput, setInversionInput] = useState(inversionAds.toString())

  const totalCash = metricasPro.cashCollected
  const totalLeadsAds = metricasPro.fuentes.find(f => f.fuente === 'ads')?.leads || 0
  const totalVentasAds = metricasPro.fuentes.find(f => f.fuente === 'ads')?.ventas || 0
  const cashAds = metricasPro.fuentes.find(f => f.fuente === 'ads')?.cash || 0

  // Métricas avanzadas opcionales si hay inversión cargada
  const roas = inversionAds > 0 ? (cashAds / inversionAds).toFixed(2) : null
  const cpl = inversionAds > 0 && totalLeadsAds > 0 ? (inversionAds / totalLeadsAds).toFixed(1) : null
  const cac = inversionAds > 0 && totalVentasAds > 0 ? Math.round(inversionAds / totalVentasAds) : null

  const handleGuardarInversion = (e: React.FormEvent) => {
    e.preventDefault()
    setInversionAds(Number(inversionInput) || 0)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-purple-400" />
            Hub Marketing & Fuentes
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Atribución comercial por canal (Orgánico, Ads, Outbound, YouTube, Referidos)
          </p>
        </div>

        {/* INPUT MANUAL DE INVERSIÓN PUBLICITARIA */}
        <form onSubmit={handleGuardarInversion} className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
          <span className="text-xs text-slate-400 pl-2">Gasto en Ads (USD):</span>
          <input 
            type="number"
            value={inversionInput}
            onChange={e => setInversionInput(e.target.value)}
            placeholder="0"
            className="w-24 px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white text-right focus:outline-none focus:border-purple-500"
          />
          <button 
            type="submit" 
            className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold transition"
          >
            Actualizar
          </button>
        </form>
      </div>

      {/* METRICAS ROI / RENDIMIENTO PUBLICITARIO SI HAY GASTO */}
      {inversionAds > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
          <div>
            <div className="text-xs text-slate-400">Inversión Declarada</div>
            <div className="text-xl font-bold text-white mt-1">$${inversionAds.toLocaleString()} USD</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">ROAS (Retorno s/ Inversión Ads)</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">{roas}x</div>
            <div className="text-[10px] text-slate-500">$${cashAds} cobrados de Ads</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">CPL Estimado (Costo x Lead)</div>
            <div className="text-xl font-bold text-purple-400 mt-1">$${cpl} USD</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">CAC (Costo Adquisición Cliente)</div>
            <div className="text-xl font-bold text-amber-400 mt-1">$${cac || 0} USD</div>
          </div>
        </div>
      )}

      {/* TABLA DE ATRIBUCIÓN POR FUENTE */}
      <div className="rounded-xl border border-slate-800 bg-[#111726] overflow-hidden">
        <div className="p-4 border-b border-slate-800/80">
          <h3 className="text-sm font-semibold text-white">Desglose de Rendimiento por Canal de Atracción</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Canal / Fuente</th>
                <th className="px-4 py-3 text-center">Leads</th>
                <th className="px-4 py-3 text-center">Agendas</th>
                <th className="px-4 py-3 text-center">Tasa Agenda</th>
                <th className="px-4 py-3 text-center">Ventas</th>
                <th className="px-4 py-3 text-center">Tasa Cierre</th>
                <th className="px-4 py-3 text-right">Cash Cobrado</th>
                <th className="px-4 py-3 text-right">% de la Caja</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {metricasPro.fuentes.map(f => {
                const pctCaja = totalCash > 0 ? Math.round((f.cash / totalCash) * 100) : 0
                return (
                  <tr key={f.fuente} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-semibold text-white capitalize flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      {f.fuente}
                    </td>
                    <td className="px-4 py-3 text-center font-mono">{f.leads}</td>
                    <td className="px-4 py-3 text-center font-mono">{f.agendas}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold text-[10px]">
                        {f.tasaAgenda}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-emerald-400">{f.ventas}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                        {f.tasaCierre}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-white">
                      $${f.cash.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-purple-400">
                      {pctCaja}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
