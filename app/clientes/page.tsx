"use client"

import { useState } from 'react'
import { useCRM } from '@/context/crm-context'
import { UserCheck, Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { NewClienteModal } from '@/components/modals/new-cliente-modal'

export default function ClientesPage() {
  const { clientes, updateCliente, deleteCliente, metricasPro } = useCRM()
  const [modalCliente, setModalCliente] = useState(false)
  const [filtro, setFiltro] = useState<string>('todos')

  const filtered = clientes.filter(c => {
    if (filtro === 'todos') return true
    if (filtro === 'activos') return c.estado === 'activo'
    if (filtro === 'onboarding') return c.estado === 'onboarding'
    if (filtro === 'riesgo') return c.salud === 'rojo' || c.salud === 'amarillo'
    return true
  })

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-emerald-400" />
            Hub Producto / Clientes ({clientes.length})
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Control de Onboarding, Entrega, Progreso y Salud del Cliente</p>
        </div>

        <button 
          onClick={() => setModalCliente(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition"
        >
          <Plus className="h-4 w-4" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* RESUMEN DE SALUD Y ONBOARDING */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800">
          <div className="text-xs text-slate-400">Total Clientes</div>
          <div className="text-2xl font-bold text-white mt-1">{clientes.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800">
          <div className="text-xs text-slate-400">En Onboarding</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">{metricasPro.clientesOnboarding}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800">
          <div className="text-xs text-slate-400">Activos en Entrega</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{metricasPro.clientesActivos}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#111726] border border-red-500/20 bg-red-500/5">
          <div className="text-xs text-red-400">En Riesgo (Atención)</div>
          <div className="text-2xl font-bold text-red-400 mt-1">{metricasPro.clientesRiesgo}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800">
          <div className="text-xs text-slate-400">Progreso Promedio</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">{metricasPro.progresoPromedioClientes}%</div>
        </div>
      </div>

      {/* FILTROS */}
      <div className="flex items-center gap-2">
        {['todos', 'onboarding', 'activos', 'riesgo'].map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-3 py-1.5 rounded-lg text-xs capitalize transition ${
              filtro === f ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TABLA CLIENTES */}
      <div className="rounded-xl border border-slate-800 bg-[#111726] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Ingreso</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Progreso</th>
                <th className="px-4 py-3 text-center">Salud</th>
                <th className="px-4 py-3">Próxima Acción</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-semibold text-white">
                    {c.nombre}
                    {c.telefono && <div className="text-[10px] text-slate-500 font-normal">{c.telefono}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-300">{c.producto}</td>
                  <td className="px-4 py-3 font-mono">{c.fecha_ingreso}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize ${
                      c.estado === 'activo' ? 'bg-emerald-500/10 text-emerald-400' :
                      c.estado === 'onboarding' ? 'bg-blue-500/10 text-blue-400' :
                      c.estado === 'finalizado' ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {c.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${c.progreso_pct}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{c.progreso_pct}%</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.salud === 'verde' ? 'bg-emerald-500/10 text-emerald-400' :
                      c.salud === 'amarillo' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {c.salud === 'verde' ? '● Verde' : c.salud === 'amarillo' ? '▲ Amarillo' : '✖ Riesgo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300 max-w-xs truncate">{c.proxima_accion || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        const nuevoProgreso = prompt('Nuevo porcentaje de progreso (0-100):', c.progreso_pct.toString())
                        if (nuevoProgreso !== null) {
                          updateCliente(c.id, { progreso_pct: Number(nuevoProgreso) || 0 })
                        }
                      }}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition"
                    >
                      Actualizar
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-500">No hay clientes en este estado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewClienteModal isOpen={modalCliente} onClose={() => setModalCliente(false)} />
    </div>
  )
}
