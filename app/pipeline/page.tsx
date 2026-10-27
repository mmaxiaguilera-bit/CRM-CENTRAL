"use client"

import { useState } from 'react'
import { useCRM } from '@/context/crm-context'
import { Lead, Agenda } from '@/types/crm'
import { 
  Trello, CheckCircle2, PhoneCall, DollarSign, Clock, 
  Calendar, Flame, Sparkles, AlertCircle 
} from 'lucide-react'
import { NewAgendaModal } from '@/components/modals/new-agenda-modal'
import { NewVentaModal } from '@/components/modals/new-venta-modal'
import { NewSeguimientoModal } from '@/components/modals/new-seguimiento-modal'

export function PipelinePage() {
  const { leads, agendas, ventas, toggleShow, toggleCalifica } = useCRM()

  const [selectedLeadId, setSelectedLeadId] = useState<string | undefined>()
  const [selectedAgendaId, setSelectedAgendaId] = useState<string | undefined>()
  const [selectedContacto, setSelectedContacto] = useState<{ nombre: string; tel: string } | undefined>()

  const [modalAgenda, setModalAgenda] = useState(false)
  const [modalVenta, setModalVenta] = useState(false)
  const [modalSeg, setModalSeg] = useState(false)

  // Columnas:
  // 1. Leads Nuevos / Contactados (leads que no están agendados)
  const colLeads = leads.filter(l => l.estado !== 'agendado')

  // 2. Agendados (agendas que aún no tienen show)
  const colAgendados = agendas.filter(a => !a.show && a.estado !== 'no_show' && a.estado !== 'cancelada')

  // 3. Asistieron (Show = true, pero aún no calificados o en revisión)
  const colShows = agendas.filter(a => a.show && !a.califica && !a.cerro)

  // 4. Calificados (Califica = true, pero aún no cerraron)
  const colCalificados = agendas.filter(a => a.califica && !a.cerro)

  // 5. Ventas Cerradas (agendas cerradas o ventas)
  const colCerrados = agendas.filter(a => a.cerro)

  return (
    <div className="p-6 space-y-4 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Trello className="h-5 w-5 text-emerald-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">Pipeline Comercial</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Flujo completo: Lead → Agendado → Asistió → Calificado → Cierre. Avanzá tarjetas con 1 click.
          </p>
        </div>
      </div>

      {/* TABLERO KANBAN */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-6">
        {/* COLUMNA 1: LEADS */}
        <div className="bg-[#111726]/80 border border-slate-800 rounded-2xl p-3 flex flex-col min-h-[550px]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-xs font-semibold text-blue-400">1. Leads ({colLeads.length})</span>
            <span className="text-[10px] text-slate-500 font-mono">Entrada</span>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {colLeads.map(l => (
              <div key={l.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-2">
                <div className="flex items-start justify-between">
                  <div className="font-semibold text-xs text-white">{l.nombre}</div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    l.score === 'caliente' ? 'bg-red-500/10 text-red-400' :
                    l.score === 'tibio' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {l.score}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">{l.telefono || l.instagram}</div>
                {l.ingreso_mensual && (
                  <div className="text-[10px] text-slate-500">Ingreso: {l.ingreso_mensual}</div>
                )}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 capitalize">{l.fuente}</span>
                  <button
                    onClick={() => {
                      setSelectedLeadId(l.id)
                      setModalAgenda(true)
                    }}
                    className="text-[11px] px-2 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 font-medium transition"
                  >
                    + Agendar
                  </button>
                </div>
              </div>
            ))}
            {colLeads.length === 0 && (
              <div className="text-center py-10 text-xs text-slate-500">Sin leads nuevos</div>
            )}
          </div>
        </div>

        {/* COLUMNA 2: AGENDADOS */}
        <div className="bg-[#111726]/80 border border-slate-800 rounded-2xl p-3 flex flex-col min-h-[550px]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-xs font-semibold text-purple-400">2. Agendados ({colAgendados.length})</span>
            <span className="text-[10px] text-slate-500 font-mono">Por llamar</span>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {colAgendados.map(a => (
              <div key={a.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-2">
                <div className="flex items-start justify-between">
                  <div className="font-semibold text-xs text-white">{a.nombre}</div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 font-semibold">
                    {a.hora_agenda}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Fecha: {a.fecha_agenda}</div>
                <div className="text-[10px] text-slate-500">Closer: {a.closer} • Setter: {a.setter}</div>
                <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 justify-end">
                  <button
                    onClick={() => toggleShow(a.id)}
                    className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-medium transition"
                  >
                    ✓ Asistió (Show)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedContacto({ nombre: a.nombre, tel: a.telefono })
                      setModalSeg(true)
                    }}
                    className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
                  >
                    Seguimiento
                  </button>
                </div>
              </div>
            ))}
            {colAgendados.length === 0 && (
              <div className="text-center py-10 text-xs text-slate-500">Sin agendas pendientes</div>
            )}
          </div>
        </div>

        {/* COLUMNA 3: ASISTIERON (SHOW) */}
        <div className="bg-[#111726]/80 border border-slate-800 rounded-2xl p-3 flex flex-col min-h-[550px]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-xs font-semibold text-emerald-400">3. Asistieron ({colShows.length})</span>
            <span className="text-[10px] text-slate-500 font-mono">En llamada</span>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {colShows.map(a => (
              <div key={a.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-2">
                <div className="flex items-start justify-between">
                  <div className="font-semibold text-xs text-white">{a.nombre}</div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                    Show OK
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">{a.notas_llamada || 'Llamada realizada'}</div>
                <div className="text-[10px] text-slate-500">Closer: {a.closer}</div>
                <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 justify-end">
                  <button
                    onClick={() => toggleCalifica(a.id)}
                    className="text-[10px] px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-medium transition"
                  >
                    ★ Califica
                  </button>
                  <button
                    onClick={() => {
                      setSelectedContacto({ nombre: a.nombre, tel: a.telefono })
                      setModalSeg(true)
                    }}
                    className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
                  >
                    Seguimiento
                  </button>
                </div>
              </div>
            ))}
            {colShows.length === 0 && (
              <div className="text-center py-10 text-xs text-slate-500">Sin llamadas para calificar</div>
            )}
          </div>
        </div>

        {/* COLUMNA 4: CALIFICADAS */}
        <div className="bg-[#111726]/80 border border-slate-800 rounded-2xl p-3 flex flex-col min-h-[550px]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-xs font-semibold text-amber-400">4. Calificadas ({colCalificados.length})</span>
            <span className="text-[10px] text-slate-500 font-mono">Oferta</span>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {colCalificados.map(a => (
              <div key={a.id} className="p-3 rounded-xl bg-slate-900 border border-amber-500/20 hover:border-amber-500/40 transition space-y-2">
                <div className="flex items-start justify-between">
                  <div className="font-semibold text-xs text-white">{a.nombre}</div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold">
                    Califica
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {a.inversion_disponible ? `Inversión: ${a.inversion_disponible}` : 'Perfil calificado'}
                </div>
                <div className="text-[10px] text-slate-500">Closer: {a.closer}</div>
                <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 justify-end">
                  <button
                    onClick={() => {
                      setSelectedAgendaId(a.id)
                      setModalVenta(true)
                    }}
                    className="text-[10px] px-2.5 py-1 rounded bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition shadow"
                  >
                    $ Cerrar Venta
                  </button>
                  <button
                    onClick={() => {
                      setSelectedContacto({ nombre: a.nombre, tel: a.telefono })
                      setModalSeg(true)
                    }}
                    className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
                  >
                    Seguimiento
                  </button>
                </div>
              </div>
            ))}
            {colCalificados.length === 0 && (
              <div className="text-center py-10 text-xs text-slate-500">Sin prospectos calificados pendientes</div>
            )}
          </div>
        </div>

        {/* COLUMNA 5: CERRADOS */}
        <div className="bg-[#111726]/80 border border-slate-800 rounded-2xl p-3 flex flex-col min-h-[550px]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-xs font-semibold text-cyan-400">5. Ventas Cerradas ({colCerrados.length})</span>
            <span className="text-[10px] text-slate-500 font-mono">Ganadas</span>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {colCerrados.map(a => (
              <div key={a.id} className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="font-semibold text-xs text-white">{a.nombre}</div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                    CERRADO
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Fecha: {a.fecha_agenda}</div>
                <div className="text-[10px] text-slate-500">Closer: {a.closer}</div>
              </div>
            ))}
            {colCerrados.length === 0 && (
              <div className="text-center py-10 text-xs text-slate-500">Sin cierres aún</div>
            )}
          </div>
        </div>
      </div>

      <NewAgendaModal 
        isOpen={modalAgenda} 
        onClose={() => {
          setModalAgenda(false)
          setSelectedLeadId(undefined)
        }} 
        initialLeadId={selectedLeadId} 
      />

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

export default PipelinePage
