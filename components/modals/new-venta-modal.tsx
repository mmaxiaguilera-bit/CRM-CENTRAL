"use client"

import { useState, useEffect } from 'react'
import { useCRM } from '@/context/crm-context'
import { FuenteLead } from '@/types/crm'
import { DollarSign, X } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  initialAgendaId?: string
}

export function NewVentaModal({ isOpen, onClose, initialAgendaId }: Props) {
  const { agendas, addVenta } = useCRM()

  const [agendaId, setAgendaId] = useState(initialAgendaId || '')
  const [clienteNombre, setClienteNombre] = useState('')
  const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0])
  const [ticketTotal, setTicketTotal] = useState('2000')
  const [cashCollected, setCashCollected] = useState('2000')
  const [medioDePago, setMedioDePago] = useState<'stripe' | 'transferencia' | 'crypto' | 'paypal' | 'efectivo' | 'otro'>('stripe')
  const [closer, setCloser] = useState('Joaquín')
  const [setter, setSetter] = useState('Mateo')
  const [fuente, setFuente] = useState<FuenteLead>('organico')
  const [planCuotas, setPlanCuotas] = useState<'pago_unico' | '2_cuotas' | '3_cuotas' | 'recurrente'>('pago_unico')
  const [notas, setNotas] = useState('')

  useEffect(() => {
    if (initialAgendaId) {
      setAgendaId(initialAgendaId)
      const agenda = agendas.find(a => a.id === initialAgendaId)
      if (agenda) {
        setClienteNombre(agenda.nombre)
        setCloser(agenda.closer || 'Joaquín')
        setSetter(agenda.setter || 'Mateo')
        setFuente(agenda.fuente || 'organico')
      }
    }
  }, [initialAgendaId, agendas])

  const handleSelectAgenda = (id: string) => {
    setAgendaId(id)
    const agenda = agendas.find(a => a.id === id)
    if (agenda) {
      setClienteNombre(agenda.nombre)
      setCloser(agenda.closer || 'Joaquín')
      setSetter(agenda.setter || 'Mateo')
      setFuente(agenda.fuente || 'organico')
    }
  }

  if (!isOpen) return null

  const ticketNum = Number(ticketTotal) || 0
  const cashNum = Number(cashCollected) || 0
  const saldoPendiente = Math.max(0, ticketNum - cashNum)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clienteNombre.trim() || ticketNum <= 0) return

    addVenta({
      agenda_id: agendaId || undefined,
      cliente_nombre: clienteNombre,
      fecha,
      ticket_total: ticketNum,
      cash_collected: cashNum,
      saldo_pendiente: saldoPendiente,
      medio_de_pago: medioDePago,
      closer,
      setter,
      fuente,
      plan_cuotas: planCuotas,
      notas
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111726] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">Registrar Venta & Cash</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {agendas.length > 0 && !initialAgendaId && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Vincular con Agenda</label>
              <select 
                value={agendaId} 
                onChange={e => handleSelectAgenda(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="">-- Venta directa sin agenda previa --</option>
                {agendas.map(a => (
                  <option key={a.id} value={a.id}>{a.nombre} ({a.fecha_agenda} - {a.closer})</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nombre del Cliente *</label>
              <input 
                required 
                value={clienteNombre} 
                onChange={e => setClienteNombre(e.target.value)}
                placeholder="Ej: Laura Castro"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Fecha de Cobro *</label>
              <input 
                type="date"
                required 
                value={fecha} 
                onChange={e => setFecha(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Ticket Total Acordado (USD) *</label>
              <input 
                type="number"
                required 
                value={ticketTotal} 
                onChange={e => setTicketTotal(e.target.value)}
                placeholder="2000"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-emerald-400 mb-1">Cash Cobrado Hoy (Efectivo/Banco) *</label>
              <input 
                type="number"
                required 
                value={cashCollected} 
                onChange={e => setCashCollected(e.target.value)}
                placeholder="1000"
                className="w-full px-3 py-2 bg-slate-900 border border-emerald-500/50 rounded-lg text-sm text-emerald-400 focus:outline-none focus:border-emerald-400 font-bold"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Saldo pendiente de cobro:</span>
            <span className="font-bold text-amber-400 text-sm">$${saldoPendiente.toLocaleString()} USD</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Medio de Pago</label>
              <select 
                value={medioDePago} 
                onChange={e => setMedioDePago(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="stripe">Stripe / Tarjeta</option>
                <option value="transferencia">Transferencia Bancaria</option>
                <option value="crypto">Cripto (USDT / USDC)</option>
                <option value="paypal">PayPal</option>
                <option value="efectivo">Efectivo</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Plan de Pago</label>
              <select 
                value={planCuotas} 
                onChange={e => setPlanCuotas(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="pago_unico">Pago Único (PIF - 100%)</option>
                <option value="2_cuotas">2 Cuotas</option>
                <option value="3_cuotas">3 Cuotas</option>
                <option value="recurrente">Mensual Recurrente</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Closer que cerró</label>
              <input 
                value={closer} 
                onChange={e => setCloser(e.target.value)}
                placeholder="Closer"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Setter que agendó</label>
              <input 
                value={setter} 
                onChange={e => setSetter(e.target.value)}
                placeholder="Setter"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Notas de la Venta</label>
            <textarea 
              rows={2}
              value={notas} 
              onChange={e => setNotas(e.target.value)}
              placeholder="Detalles del acuerdo, fechas de las próximas cuotas, etc."
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
              Confirmar Venta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
