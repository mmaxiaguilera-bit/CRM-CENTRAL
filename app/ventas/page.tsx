"use client"

import { useState } from 'react'
import { useCRM } from '@/context/crm-context'
import { DollarSign, Plus, CheckCircle2, TrendingUp, Trash2 } from 'lucide-react'
import { NewVentaModal } from '@/components/modals/new-venta-modal'

export default function VentasPage() {
  const { ventas, metricas, deleteVenta } = useCRM()
  const [modalVenta, setModalVenta] = useState(false)

  const saldosPendientes = ventas.reduce((acc, v) => acc + (Number(v.saldo_pendiente) || 0), 0)

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            Ventas & Cash Cobrado ({ventas.length})
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Control de ingresos, pagos y cuotas pendientes</p>
        </div>

        <button 
          onClick={() => setModalVenta(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition"
        >
          <Plus className="h-4 w-4" />
          <span>Registrar Venta</span>
        </button>
      </div>

      {/* TARJETAS RESUMEN FINANCIERO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#111726] border border-emerald-500/20">
          <div className="text-xs text-slate-400">Cash Cobrado Total</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">
            $${metricas.cashCollected.toLocaleString()} USD
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Efectivo en mano/cuenta</div>
        </div>

        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800">
          <div className="text-xs text-slate-400">Saldo Pendiente de Cobro</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">
            $${saldosPendientes.toLocaleString()} USD
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Cuotas acordadas a vencer</div>
        </div>

        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800">
          <div className="text-xs text-slate-400">Ticket Promedio (AOV)</div>
          <div className="text-2xl font-bold text-white mt-1">
            $${metricas.ticketPromedio.toLocaleString()} USD
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Cash cobrado / total ventas</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-[#111726] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Ticket Total</th>
                <th className="px-4 py-3">Cash Cobrado</th>
                <th className="px-4 py-3">Saldo Pendiente</th>
                <th className="px-4 py-3">Medio</th>
                <th className="px-4 py-3">Closer / Setter</th>
                <th className="px-4 py-3">Plan Cuotas</th>
                <th className="px-4 py-3">Notas</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {ventas.map(v => (
                <tr key={v.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-medium text-white">{v.cliente_nombre}</td>
                  <td className="px-4 py-3 font-mono">{v.fecha}</td>
                  <td className="px-4 py-3 font-semibold text-slate-200">$${v.ticket_total.toLocaleString()}</td>
                  <td className="px-4 py-3 font-bold text-emerald-400">$${v.cash_collected.toLocaleString()}</td>
                  <td className="px-4 py-3 font-semibold text-amber-400">
                    {v.saldo_pendiente > 0 ? `$${v.saldo_pendiente.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 capitalize">{v.medio_de_pago}</td>
                  <td className="px-4 py-3">{v.closer} / {v.setter}</td>
                  <td className="px-4 py-3 capitalize">{v.plan_cuotas.replace(/_/g, ' ')}</td>
                  <td className="px-4 py-3 text-slate-400 max-w-xs truncate">{v.notas || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar la venta de ${v.cliente_nombre}?`)) {
                          deleteVenta(v.id)
                        }
                      }}
                      title="Eliminar venta"
                      className="p-1 rounded bg-slate-800 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 text-[11px] transition inline-flex items-center"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
              {ventas.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-10 text-slate-500">No hay ventas registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewVentaModal isOpen={modalVenta} onClose={() => setModalVenta(false)} />
    </div>
  )
}
