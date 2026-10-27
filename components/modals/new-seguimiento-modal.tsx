"use client"

import { useState } from 'react'
import { useCRM } from '@/context/crm-context'
import { Clock, X } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  initialNombre?: string
  initialTelefono?: string
}

export function NewSeguimientoModal({ isOpen, onClose, initialNombre, initialTelefono }: Props) {
  const { addSeguimiento } = useCRM()

  const [nombreContacto, setNombreContacto] = useState(initialNombre || '')
  const [telefono, setTelefono] = useState(initialTelefono || '')
  const [fechaProximoContacto, setFechaProximoContacto] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 2)
    return d.toISOString().split('T')[0]
  })
  const [responsable, setResponsable] = useState('Joaquín')
  const [motivo, setMotivo] = useState('Lo consulta con socio/pareja')
  const [notas, setNotas] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombreContacto.trim()) return

    addSeguimiento({
      nombre_contacto: nombreContacto,
      telefono,
      fecha_proximo_contacto: fechaProximoContacto,
      responsable,
      estado: 'pendiente',
      motivo,
      notas
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111726] border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">Programar Seguimiento</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Nombre del Prospecto *</label>
            <input 
              required 
              value={nombreContacto} 
              onChange={e => setNombreContacto(e.target.value)}
              placeholder="Ej: Sofía Albarracín"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Teléfono / WhatsApp</label>
            <input 
              value={telefono} 
              onChange={e => setTelefono(e.target.value)}
              placeholder="+54 9 11 2233-4455"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Fecha de Seguimiento *</label>
              <input 
                type="date"
                required 
                value={fechaProximoContacto} 
                onChange={e => setFechaProximoContacto(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 font-semibold text-amber-300"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Responsable</label>
              <input 
                value={responsable} 
                onChange={e => setResponsable(e.target.value)}
                placeholder="Nombre del Closer o Setter"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Motivo del Seguimiento</label>
            <select 
              value={motivo} 
              onChange={e => setMotivo(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            >
              <option value="Lo consulta con socio/pareja">Lo consulta con socio/pareja</option>
              <option value="No Show - Reprogramar llamada">No Show - Reprogramar llamada</option>
              <option value="Juntando el dinero / Crédito">Juntando el dinero / Crédito</option>
              <option value="Dudas sobre el entregable">Dudas sobre el entregable</option>
              <option value="Objeción de tiempo / Lanzamiento">Objeción de tiempo / Lanzamiento</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Notas y Próximo Paso</label>
            <textarea 
              rows={2}
              value={notas} 
              onChange={e => setNotas(e.target.value)}
              placeholder="Ej: Mandar audio a las 11:00 preguntando qué resolvieron..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
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
              className="px-5 py-2 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition"
            >
              Guardar Seguimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
