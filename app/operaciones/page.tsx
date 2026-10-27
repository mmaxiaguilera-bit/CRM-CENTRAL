"use client"

import { useState } from 'react'
import { useCRM } from '@/context/crm-context'
import { CheckSquare, Plus, AlertCircle, Clock, CheckCircle2, Trash2 } from 'lucide-react'
import { NewTareaModal } from '@/components/modals/new-tarea-modal'

export default function OperacionesPage() {
  const { tareas, toggleTareaCompletada, deleteTarea, metricasPro } = useCRM()
  const [modalTarea, setModalTarea] = useState(false)
  const [filtroArea, setFiltroArea] = useState<string>('todas')

  const filtered = tareas.filter(t => {
    if (filtroArea === 'todas') return true
    return t.area === filtroArea
  })

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-blue-400" />
            Hub Operaciones ({tareas.filter(t => t.estado !== 'completado').length} pendientes)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Gestión de cuellos de botella y tareas críticas del equipo</p>
        </div>

        <button 
          onClick={() => setModalTarea(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs transition"
        >
          <Plus className="h-4 w-4" />
          <span>Nueva Tarea</span>
        </button>
      </div>

      {/* TARJETAS RESUMEN OPERATIVO */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800">
          <div className="text-xs text-slate-400">Tareas Pendientes</div>
          <div className="text-2xl font-bold text-white mt-1">{metricasPro.tareasPendientes}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#111726] border border-red-500/20 bg-red-500/5">
          <div className="text-xs text-red-400">Alta Prioridad (Críticas)</div>
          <div className="text-2xl font-bold text-red-400 mt-1">{metricasPro.tareasAltaPrioridad}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#111726] border border-amber-500/20 bg-amber-500/5">
          <div className="text-xs text-amber-400">Tareas Vencidas</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">{metricasPro.tareasVencidas}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800">
          <div className="text-xs text-slate-400">Tareas Resueltas</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">
            {tareas.filter(t => t.estado === 'completado').length}
          </div>
        </div>
      </div>

      {/* FILTROS POR ÁREA */}
      <div className="flex items-center gap-2">
        {['todas', 'ventas', 'marketing', 'producto', 'administracion'].map(area => (
          <button
            key={area}
            onClick={() => setFiltroArea(area)}
            className={`px-3 py-1.5 rounded-lg text-xs capitalize transition ${
              filtroArea === area ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      {/* LISTA DE TAREAS */}
      <div className="rounded-xl border border-slate-800 bg-[#111726] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Tarea</th>
                <th className="px-4 py-3">Área</th>
                <th className="px-4 py-3">Responsable</th>
                <th className="px-4 py-3">Prioridad</th>
                <th className="px-4 py-3">Límite</th>
                <th className="px-4 py-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleTareaCompletada(t.id)}
                      className={`h-5 w-5 rounded border flex items-center justify-center transition ${
                        t.estado === 'completado' 
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-bold' 
                          : 'border-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {t.estado === 'completado' && '✓'}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-medium text-white">
                    <span className={t.estado === 'completado' ? 'line-through text-slate-500' : ''}>
                      {t.tarea}
                    </span>
                    {t.notas && <div className="text-[10px] text-slate-500 font-normal">{t.notas}</div>}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-400">{t.area}</td>
                  <td className="px-4 py-3">{t.responsable}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize ${
                      t.prioridad === 'alta' ? 'bg-red-500/10 text-red-400' :
                      t.prioridad === 'media' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {t.prioridad}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-400">{t.fecha_limite || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteTarea(t.id)}
                      className="p-1 rounded text-slate-500 hover:text-red-400 transition"
                    >
                      <Trash2 className="h-3.5 w-3.5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">No hay tareas en esta área</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewTareaModal isOpen={modalTarea} onClose={() => setModalTarea(false)} />
    </div>
  )
}
