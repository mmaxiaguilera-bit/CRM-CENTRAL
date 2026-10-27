"use client"

import { useState } from 'react'
import { useCRM } from '@/context/crm-context'
import { Users, Plus, Calendar, Trash2 } from 'lucide-react'
import { NewLeadModal } from '@/components/modals/new-lead-modal'
import { NewAgendaModal } from '@/components/modals/new-agenda-modal'

export default function LeadsPage() {
  const { leads, deleteLead } = useCRM()
  const [modalLead, setModalLead] = useState(false)
  const [selectedLeadId, setSelectedLeadId] = useState<string | undefined>()
  const [modalAgenda, setModalAgenda] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = leads.filter(l => 
    l.nombre.toLowerCase().includes(search.toLowerCase()) ||
    (l.telefono && l.telefono.includes(search)) ||
    (l.instagram && l.instagram.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Base de Leads ({leads.length})
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Contactos registrados antes o durante la prospección</p>
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="text"
            placeholder="Buscar por nombre, teléfono o IG..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-64"
          />
          <button 
            onClick={() => setModalLead(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Lead</span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-[#111726] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Contacto</th>
                <th className="px-4 py-3">Fuente</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Ingreso Mensual</th>
                <th className="px-4 py-3">Inversión Disp.</th>
                <th className="px-4 py-3">Problema Actual</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-medium text-white">{l.nombre}</td>
                  <td className="px-4 py-3 text-slate-400">
                    <div>{l.telefono || '-'}</div>
                    <div className="text-[10px] text-slate-500">{l.instagram || l.email}</div>
                  </td>
                  <td className="px-4 py-3 capitalize">{l.fuente}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      l.score === 'caliente' ? 'bg-red-500/10 text-red-400' :
                      l.score === 'tibio' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {l.score}
                    </span>
                  </td>
                  <td className="px-4 py-3">{l.ingreso_mensual || '-'}</td>
                  <td className="px-4 py-3">{l.inversion_disponible || '-'}</td>
                  <td className="px-4 py-3 max-w-xs truncate text-slate-400">{l.problema_actual || '-'}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedLeadId(l.id)
                        setModalAgenda(true)
                      }}
                      className="px-2 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 font-medium text-[11px] transition"
                    >
                      Agendar
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar lead ${l.nombre}?`)) deleteLead(l.id)
                      }}
                      className="p-1 rounded text-slate-500 hover:text-red-400 transition"
                    >
                      <Trash2 className="h-3.5 w-3.5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-500">No se encontraron leads</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewLeadModal isOpen={modalLead} onClose={() => setModalLead(false)} />
      <NewAgendaModal 
        isOpen={modalAgenda} 
        onClose={() => {
          setModalAgenda(false)
          setSelectedLeadId(undefined)
        }} 
        initialLeadId={selectedLeadId} 
      />
    </div>
  )
}
