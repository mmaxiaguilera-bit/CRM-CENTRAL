"use client"

import { useState } from 'react'
import { useCRM } from '@/context/crm-context'
import { AreaTarea, PrioridadTarea, EstadoTarea } from '@/types/crm'
import { CheckSquare, X } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function NewTareaModal({ isOpen, onClose }: Props) {
  const { addTarea } = useCRM()
  const [tarea, setTarea] = useState('')
  const [area, setArea] = useState<AreaTarea>('ventas')
  const [responsable, setResponsable] = useState('Joaquín')
  const [prioridad, setPrioridad] = useState<PrioridadTarea>('media')
  const [estado, setEstado] = useState<EstadoTarea>('pendiente')
  const [fechaLimite, setFechaLimite] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 3)
    return d.toISOString().split('T')[0]
  })
  const [notas, setNotas] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!tarea.trim()) return

    addTarea({
      tarea,
      area,
      responsable,
      prioridad,
      estado,
      fecha_limite: fechaLimite,
      notas
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111726] border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Nueva Tarea Operativa</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Título de la Tarea *</label>
            <input 
              required 
              value={tarea} 
              onChange={e => setTarea(e.target.value)}
              placeholder="Ej: Auditar 5 llamadas de Cristian para corregir objeciones..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Área</label>
              <select 
                value={area} 
                onChange={e => setArea(e.target.value as AreaTarea)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 capitalize"
              >
                <option value="ventas">Ventas</option>
                <option value="marketing">Marketing</option>
                <option value="producto">Producto / Entrega</option>
                <option value="administracion">Administración</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Responsable</label>
              <input 
                value={responsable} 
                onChange={e => setResponsable(e.target.value)}
                placeholder="Responsable"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Prioridad</label>
              <select 
                value={prioridad} 
                onChange={e => setPrioridad(e.target.value as PrioridadTarea)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="alta">🔴 Alta (Crítica)</option>
                <option value="media">🟡 Media</option>
                <option value="baja">🟢 Baja</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Fecha Límite</label>
              <input 
                type="date"
                value={fechaLimite} 
                onChange={e => setFechaLimite(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Detalles y Enlaces</label>
            <textarea 
              rows={2}
              value={notas} 
              onChange={e => setNotas(e.target.value)}
              placeholder="Instrucciones o recursos necesarios..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
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
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition"
            >
              Guardar Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
