"use client"

import { useState } from 'react'
import { useCRM } from '@/context/crm-context'
import { EstadoCliente, SaludCliente } from '@/types/crm'
import { UserCheck, X } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function NewClienteModal({ isOpen, onClose }: Props) {
  const { addCliente } = useCRM()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [producto, setProducto] = useState('Programa High Ticket')
  const [fechaIngreso, setFechaIngreso] = useState(() => new Date().toISOString().split('T')[0])
  const [estado, setEstado] = useState<EstadoCliente>('onboarding')
  const [progresoPct, setProgresoPct] = useState('10')
  const [salud, setSalud] = useState<SaludCliente>('verde')
  const [proximaAccion, setProximaAccion] = useState('')
  const [entregablesPendientes, setEntregablesPendientes] = useState('')
  const [notas, setNotas] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim()) return

    addCliente({
      nombre,
      email,
      telefono,
      producto,
      fecha_ingreso: fechaIngreso,
      estado,
      progreso_pct: Number(progresoPct) || 0,
      salud,
      proxima_accion: proximaAccion,
      entregables_pendientes: entregablesPendientes,
      notas
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111726] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">Nuevo Cliente</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nombre del Cliente *</label>
              <input 
                required 
                value={nombre} 
                onChange={e => setNombre(e.target.value)}
                placeholder="Ej: Laura Castro"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Producto o Servicio *</label>
              <input 
                required 
                value={producto} 
                onChange={e => setProducto(e.target.value)}
                placeholder="Ej: Mentoría 1 a 1, Agencia..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp / Contacto</label>
              <input 
                value={telefono} 
                onChange={e => setTelefono(e.target.value)}
                placeholder="+54 9 11 9988-7766"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
              <input 
                type="email"
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="laura@cliente.com"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Fecha de Ingreso</label>
              <input 
                type="date"
                value={fechaIngreso} 
                onChange={e => setFechaIngreso(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Estado del Cliente</label>
              <select 
                value={estado} 
                onChange={e => setEstado(e.target.value as EstadoCliente)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="onboarding">En Onboarding</option>
                <option value="activo">Activo (En servicio)</option>
                <option value="pausa">En Pausa</option>
                <option value="finalizado">Finalizado / Graduado</option>
                <option value="cancelado">Cancelado / Churn</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Progreso General ({progresoPct}%)</label>
              <input 
                type="range"
                min="0"
                max="100"
                value={progresoPct} 
                onChange={e => setProgresoPct(e.target.value)}
                className="w-full accent-emerald-500 mt-2"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Salud del Cliente</label>
              <select 
                value={salud} 
                onChange={e => setSalud(e.target.value as SaludCliente)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="verde">🟢 Verde (Excelente ritmo)</option>
                <option value="amarillo">🟡 Amarillo (Con dudas / Demorado)</option>
                <option value="rojo">🔴 Rojo (En riesgo de baja)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Próxima Acción / Entregable Inmediato</label>
            <input 
              value={proximaAccion} 
              onChange={e => setProximaAccion(e.target.value)}
              placeholder="Ej: Kickoff call el jueves a las 15 hs..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Notas y Observaciones</label>
            <textarea 
              rows={2}
              value={notas} 
              onChange={e => setNotas(e.target.value)}
              placeholder="Notas de entrega, acuerdos particulares..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
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
              className="px-5 py-2 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition"
            >
              Guardar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
