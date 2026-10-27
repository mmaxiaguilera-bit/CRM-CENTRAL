"use client"

import { useState } from 'react'
import { useCRM } from '@/context/crm-context'
import { Calendar, Plus, DollarSign, Clock, Trash2 } from 'lucide-react'
import { NewAgendaModal } from '@/components/modals/new-agenda-modal'
import { NewVentaModal } from '@/components/modals/new-venta-modal'
import { NewSeguimientoModal } from '@/components/modals/new-seguimiento-modal'

export default function AgendasPage() {
  const { agendas, toggleShow, toggleCalifica, deleteAgenda } = useCRM()
  const [modalAgenda, setModalAgenda] = useState(false)
  const [modalVenta, setModalVenta] = useState(false)
  const [modalSeg, setModalSeg] = useState(false)
  const [selectedAgendaId, setSelectedAgendaId] = useState<string | undefined>()
  const [selectedContacto, setSelectedContacto] = useState<{ nombre: string; tel: string } | undefined>()

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            Llamadas Agendadas ({agendas.length})
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Control de Show, Calificación y Cierres</p>
        </div>

        <button 
          onClick={() => setModalAgenda(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs transition"
        >
          <Plus className="h-4 w-4" />
          <span>Nueva Agenda</span>
        </button>
      </div>

      <div className="rounded-xl border border-slate-800 bg-[#111726] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Fecha y Hora</th>
                <th className="px-4 py-3">Closer / Setter</th>
                <th className="px-4 py-3">Fuente</th>
                <th className="px-4 py-3 text-center">Show</th>
                <th className="px-4 py-3 text-center">Califica</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {agendas.map(a => (
                <tr key={a.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-medium text-white">
                    {a.nombre}
                    {a.telefono && <div className="text-[10px] text-slate-500">{a.telefono}</div>}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-300">{a.fecha_agenda} {a.hora_agenda}</td>
                  <td className="px-4 py-3">{a.closer} / {a.setter}</td>
                  <td className="px-4 py-3 capitalize">{a.fuente}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleShow(a.id)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition ${
                        a.show 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-emerald-500/10'
                      }`}
                    >
                      {a.show ? '✓ SÍ' : '✗ NO'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleCalifica(a.id)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition ${
                        a.califica 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                          : 'bg-slate-800 text-slate-500 border border-slate-700 hover:text-amber-400'
                      }`}
                    >
                      {a.califica ? '★ SÍ' : '☆ NO'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className="capitalize text-slate-400 text-[11px]">{a.estado.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {!a.cerro && (
                      <button
                        onClick={() => {
                          setSelectedAgendaId(a.id)
                          setModalVenta(true)
                        }}
                        className="px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold text-[11px] transition"
                      >
                        + Venta
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedContacto({ nombre: a.nombre, tel: a.telefono })
                        setModalSeg(true)
                      }}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 text-[11px] transition"
                    >
                      Seguimiento
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar la llamada de ${a.nombre}?`)) {
                          deleteAgenda(a.id)
                        }
                      }}
                      title="Eliminar llamada"
                      className="p-1 rounded bg-slate-800 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 text-[11px] transition inline-flex items-center align-middle"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
              {agendas.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-500">No hay llamadas agendadas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewAgendaModal isOpen={modalAgenda} onClose={() => setModalAgenda(false)} />
      <NewVentaModal 
        isOpen={modalVenta} 
        onClose={() => {
          setModalVenta(false)
          setSelectedAgendaId(undefined)
        }} 
        initialAgendaId={selectedAgendaId} 
      />
      <NewSeguimientoModal 
        isOpen={modalSeg} 
        onClose={() => {
          setModalSeg(false)
          setSelectedContacto(undefined)
        }} 
        initialNombre={selectedContacto?.nombre}
        initialTelefono={selectedContacto?.tel}
      />
    </div>
  )
}
