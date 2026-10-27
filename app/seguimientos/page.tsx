"use client"

import { useState } from 'react'
import { useCRM } from '@/context/crm-context'
import { Clock, Plus, CheckCircle2, Trash2 } from 'lucide-react'
import { NewSeguimientoModal } from '@/components/modals/new-seguimiento-modal'

export default function SeguimientosPage() {
  const { seguimientos, toggleSeguimientoCompletado, deleteSeguimiento } = useCRM()
  const [modalSeg, setModalSeg] = useState(false)
  const [filtro, setFiltro] = useState<'todos' | 'pendientes' | 'realizados'>('pendientes')

  const filtered = seguimientos.filter(s => {
    if (filtro === 'pendientes') return s.estado === 'pendiente'
    if (filtro === 'realizados') return s.estado === 'realizado'
    return true
  })

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-400" />
            Cola de Seguimientos ({seguimientos.filter(s => s.estado === 'pendiente').length} pendientes)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Prospectos que pidieron tiempo, tuvieron dudas o faltaron</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs">
            <button 
              onClick={() => setFiltro('pendientes')}
              className={`px-3 py-1 rounded-md transition ${filtro === 'pendientes' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
            >
              Pendientes
            </button>
            <button 
              onClick={() => setFiltro('realizados')}
              className={`px-3 py-1 rounded-md transition ${filtro === 'realizados' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
            >
              Realizados
            </button>
            <button 
              onClick={() => setFiltro('todos')}
              className={`px-3 py-1 rounded-md transition ${filtro === 'todos' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400'}`}
            >
              Todos
            </button>
          </div>

          <button 
            onClick={() => setModalSeg(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Seguimiento</span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-[#111726] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Contacto</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Fecha Programada</th>
                <th className="px-4 py-3">Responsable</th>
                <th className="px-4 py-3">Motivo</th>
                <th className="px-4 py-3">Notas</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Completar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-medium text-white">{s.nombre_contacto}</td>
                  <td className="px-4 py-3 text-slate-400">{s.telefono || '-'}</td>
                  <td className="px-4 py-3 font-semibold text-amber-400 font-mono">{s.fecha_proximo_contacto}</td>
                  <td className="px-4 py-3">{s.responsable}</td>
                  <td className="px-4 py-3 text-slate-300">{s.motivo}</td>
                  <td className="px-4 py-3 max-w-xs truncate text-slate-400">{s.notas || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      s.estado === 'pendiente' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {s.estado.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => toggleSeguimientoCompletado(s.id)}
                      className={`px-3 py-1 rounded text-[11px] font-semibold transition ${
                        s.estado === 'pendiente' 
                          ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s.estado === 'pendiente' ? 'Marcar Listo' : 'Reabrir'}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar el seguimiento de ${s.nombre_contacto}?`)) {
                          deleteSeguimiento(s.id)
                        }
                      }}
                      title="Eliminar seguimiento"
                      className="p-1.5 rounded bg-slate-800 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 text-[11px] transition inline-flex items-center ml-2"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-500">No hay seguimientos en esta lista</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewSeguimientoModal isOpen={modalSeg} onClose={() => setModalSeg(false)} />
    </div>
  )
}
