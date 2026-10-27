"use client"

import { useState } from 'react'
import { useCRM } from '@/context/crm-context'
import { FuenteLead, ScoreLead, EstadoLead } from '@/types/crm'
import { X, UserPlus } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function NewLeadModal({ isOpen, onClose }: Props) {
  const { addLead } = useCRM()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [instagram, setInstagram] = useState('')
  const [fuente, setFuente] = useState<FuenteLead>('organico')
  const [estado, setEstado] = useState<EstadoLead>('nuevo')
  const [ingresoMensual, setIngresoMensual] = useState('')
  const [intentosPrevios, setIntentosPrevios] = useState('')
  const [urgencia, setUrgencia] = useState('Alta')
  const [inversionDisponible, setInversionDisponible] = useState('')
  const [problemaActual, setProblemaActual] = useState('')
  const [score, setScore] = useState<ScoreLead>('tibio')
  const [notas, setNotas] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim()) return

    addLead({
      nombre,
      email,
      telefono,
      instagram,
      fuente,
      estado,
      ingreso_mensual: ingresoMensual,
      intentos_previos: intentosPrevios,
      urgencia,
      inversion_disponible: inversionDisponible,
      problema_actual: problemaActual,
      score,
      notas
    })

    setNombre('')
    setEmail('')
    setTelefono('')
    setInstagram('')
    setNotas('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111726] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">Nuevo Lead</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nombre Completo *</label>
              <input 
                required 
                value={nombre} 
                onChange={e => setNombre(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp / Teléfono</label>
              <input 
                value={telefono} 
                onChange={e => setTelefono(e.target.value)}
                placeholder="+54 9 11 1234-5678"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
              <input 
                type="email"
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="juan@ejemplo.com"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Instagram (@usuario)</label>
              <input 
                value={instagram} 
                onChange={e => setInstagram(e.target.value)}
                placeholder="@juanperez"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Fuente del Lead</label>
              <select 
                value={fuente} 
                onChange={e => setFuente(e.target.value as FuenteLead)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="organico">Instagram Orgánico</option>
                <option value="ads">Meta Ads (Publicidad)</option>
                <option value="outbound">Outbound (DMs / Frío)</option>
                <option value="youtube">YouTube</option>
                <option value="referidos">Referidos</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nivel de Interés (Score)</label>
              <select 
                value={score} 
                onChange={e => setScore(e.target.value as ScoreLead)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="caliente">🔥 Caliente (Muy interesado)</option>
                <option value="tibio">⚡ Tibio (Preguntando)</option>
                <option value="frio">❄️ Frío (Apenas saludó)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Contexto y Calificación</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Ingreso Mensual Actual</label>
                <input 
                  value={ingresoMensual} 
                  onChange={e => setIngresoMensual(e.target.value)}
                  placeholder="Ej: $1,200 USD/mes"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Inversión Disponible</label>
                <input 
                  value={inversionDisponible} 
                  onChange={e => setInversionDisponible(e.target.value)}
                  placeholder="Ej: $2,000 USD"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Urgencia para Resolverlo</label>
                <input 
                  value={urgencia} 
                  onChange={e => setUrgencia(e.target.value)}
                  placeholder="Ej: Alta (este mes)"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Intentos Previos</label>
                <input 
                  value={intentosPrevios} 
                  onChange={e => setIntentosPrevios(e.target.value)}
                  placeholder="Ej: Compró cursos, probó agencia"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-medium text-slate-300 mb-1">Problema Actual Principal</label>
              <textarea 
                rows={2}
                value={problemaActual} 
                onChange={e => setProblemaActual(e.target.value)}
                placeholder="Ej: No tiene sistema predecible de agendas y los prospectos le dicen que no tienen dinero..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="mt-3">
              <label className="block text-xs font-medium text-slate-300 mb-1">Notas Internas</label>
              <textarea 
                rows={2}
                value={notas} 
                onChange={e => setNotas(e.target.value)}
                placeholder="Observaciones de la conversación..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
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
              className="px-5 py-2 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition"
            >
              Guardar Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
