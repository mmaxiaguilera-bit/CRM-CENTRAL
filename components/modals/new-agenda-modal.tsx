"use client"

import { useState, useEffect } from 'react'
import { useCRM } from '@/context/crm-context'
import { FuenteLead } from '@/types/crm'
import { Calendar, X } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  initialLeadId?: string
}

export function NewAgendaModal({ isOpen, onClose, initialLeadId }: Props) {
  const { leads, addAgenda } = useCRM()

  const [leadId, setLeadId] = useState(initialLeadId || '')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [instagram, setInstagram] = useState('')
  const [fechaAgenda, setFechaAgenda] = useState(() => new Date().toISOString().split('T')[0])
  const [horaAgenda, setHoraAgenda] = useState('16:00')
  const [setter, setSetter] = useState('Mateo')
  const [closer, setCloser] = useState('Joaquín')
  const [fuente, setFuente] = useState<FuenteLead>('organico')
  const [ingresoMensual, setIngresoMensual] = useState('')
  const [inversionDisponible, setInversionDisponible] = useState('')
  const [problemaActual, setProblemaActual] = useState('')
  const [notasLlamada, setNotasLlamada] = useState('')

  useEffect(() => {
    if (initialLeadId) {
      setLeadId(initialLeadId)
      const lead = leads.find(l => l.id === initialLeadId)
      if (lead) {
        setNombre(lead.nombre)
        setEmail(lead.email || '')
        setTelefono(lead.telefono || '')
        setInstagram(lead.instagram || '')
        setFuente(lead.fuente)
        setIngresoMensual(lead.ingreso_mensual || '')
        setInversionDisponible(lead.inversion_disponible || '')
        setProblemaActual(lead.problema_actual || '')
      }
    }
  }, [initialLeadId, leads])

  const handleSelectLead = (id: string) => {
    setLeadId(id)
    const lead = leads.find(l => l.id === id)
    if (lead) {
      setNombre(lead.nombre)
      setEmail(lead.email || '')
      setTelefono(lead.telefono || '')
      setInstagram(lead.instagram || '')
      setFuente(lead.fuente)
      setIngresoMensual(lead.ingreso_mensual || '')
      setInversionDisponible(lead.inversion_disponible || '')
      setProblemaActual(lead.problema_actual || '')
    }
  }

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim()) return

    addAgenda({
      lead_id: leadId || undefined,
      nombre,
      email,
      telefono,
      instagram,
      fecha_agenda: fechaAgenda,
      hora_agenda: horaAgenda,
      setter,
      closer,
      fuente,
      show: false,
      califica: false,
      cerro: false,
      estado: 'agendada',
      ingreso_mensual: ingresoMensual,
      inversion_disponible: inversionDisponible,
      problema_actual: problemaActual,
      notas_llamada: notasLlamada
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111726] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Agendar Llamada</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {leads.length > 0 && !initialLeadId && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Opcional: Seleccionar Lead existente</label>
              <select 
                value={leadId} 
                onChange={e => handleSelectLead(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">-- Crear agenda para lead nuevo --</option>
                {leads.map(l => (
                  <option key={l.id} value={l.id}>{l.nombre} ({l.telefono || l.instagram || l.fuente})</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nombre del Prospecto *</label>
              <input 
                required 
                value={nombre} 
                onChange={e => setNombre(e.target.value)}
                placeholder="Ej: Marcos Gómez"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp / Contacto</label>
              <input 
                value={telefono} 
                onChange={e => setTelefono(e.target.value)}
                placeholder="+54 9 11 9988-7766"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Fecha de la Llamada *</label>
              <input 
                type="date"
                required 
                value={fechaAgenda} 
                onChange={e => setFechaAgenda(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Hora de la Llamada</label>
              <input 
                type="time"
                value={horaAgenda} 
                onChange={e => setHoraAgenda(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Closer Asignado</label>
              <input 
                value={closer} 
                onChange={e => setCloser(e.target.value)}
                placeholder="Nombre del Closer"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Setter que agendó</label>
              <input 
                value={setter} 
                onChange={e => setSetter(e.target.value)}
                placeholder="Nombre del Setter"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Ingreso Mensual Declarado</label>
              <input 
                value={ingresoMensual} 
                onChange={e => setIngresoMensual(e.target.value)}
                placeholder="$1,500 USD"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Inversión Disponible</label>
              <input 
                value={inversionDisponible} 
                onChange={e => setInversionDisponible(e.target.value)}
                placeholder="$2,000 USD"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Notas de Contexto para la Llamada</label>
            <textarea 
              rows={2}
              value={notasLlamada} 
              onChange={e => setNotasLlamada(e.target.value)}
              placeholder="Puntos clave que tocó en el chat, expectativas, objeciones anticipadas..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-sm text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition"
            >
              Guardar Agenda
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
