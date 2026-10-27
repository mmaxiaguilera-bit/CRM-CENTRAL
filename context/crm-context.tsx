"use client"

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { 
  Lead, Agenda, Venta, Seguimiento, Cliente, OperacionTarea,
  MetricasLite, MetricasPro, MetricasFuente, CrmMode, FuenteLead, LayoutStyle 
} from '@/types/crm'
import { 
  DEMO_LEADS as INITIAL_LEADS, 
  DEMO_AGENDAS as INITIAL_AGENDAS, 
  DEMO_VENTAS as INITIAL_VENTAS, 
  DEMO_SEGUIMIENTOS as INITIAL_SEGUIMIENTOS,
  DEMO_CLIENTES as INITIAL_CLIENTES 
} from '@/lib/demo-data'
import { supabase, isConfigured } from '@/lib/supabase'

const INITIAL_TAREAS: OperacionTarea[] = [
  { id: '1', tarea: 'Revisar guion del setter para mejorar tasa de agenda', area: 'ventas', responsable: 'Joaquín', prioridad: 'alta', estado: 'pendiente', fecha_limite: '2026-10-08', created_at: new Date().toISOString() },
  { id: '2', tarea: 'Crear 3 ganchos nuevos para Meta Ads', area: 'marketing', responsable: 'Mateo', prioridad: 'media', estado: 'en_progreso', fecha_limite: '2026-10-10', created_at: new Date().toISOString() },
  { id: '3', tarea: 'Onboarding llamada 1 a 1 de Ignacio Rossi', area: 'producto', responsable: 'Facundo', prioridad: 'alta', estado: 'pendiente', fecha_limite: '2026-10-07', created_at: new Date().toISOString() },
  { id: '4', tarea: 'Conciliar cobros de Stripe y transferencias de la semana', area: 'administracion', responsable: 'Tomás', prioridad: 'baja', estado: 'completado', fecha_limite: '2026-10-05', created_at: new Date().toISOString() }
]

function generateUUID(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Sanitizar objetos para no enviar strings vacíos a columnas UUID de Supabase
function cleanForSupabase<T extends Record<string, any>>(obj: T): T {
  const cleaned: Record<string, any> = { ...obj }
  const uuidFields = ['id', 'lead_id', 'agenda_id', 'venta_id']
  for (const field of uuidFields) {
    if (field in cleaned) {
      if (!cleaned[field] || cleaned[field] === '') {
        cleaned[field] = null
      }
    }
  }
  return cleaned as T
}

interface CRMContextType {
  layoutStyle: LayoutStyle
  setLayoutStyle: (s: LayoutStyle) => void
  mode: CrmMode
  setMode: (m: CrmMode) => void
  isConfigured: boolean
  supabaseConnected: boolean
  supabaseLoading: boolean
  supabaseError: string | null
  dismissSupabaseError: () => void
  leads: Lead[]
  agendas: Agenda[]
  ventas: Venta[]
  seguimientos: Seguimiento[]
  clientes: Cliente[]
  tareas: OperacionTarea[]
  inversionAds: number
  setInversionAds: (m: number) => void
  metricas: MetricasLite
  metricasLite: MetricasLite
  metricasPro: MetricasPro
  addLead: (lead: Omit<Lead, 'id' | 'created_at'>) => Lead
  updateLead: (id: string, data: Partial<Lead>) => void
  deleteLead: (id: string) => void
  addAgenda: (agenda: Omit<Agenda, 'id' | 'created_at'>) => Agenda
  updateAgenda: (id: string, data: Partial<Agenda>) => void
  deleteAgenda: (id: string) => void
  toggleShow: (agendaId: string) => void
  toggleCalifica: (agendaId: string) => void
  addVenta: (venta: Omit<Venta, 'id' | 'created_at'>) => Venta
  deleteVenta: (id: string) => void
  addSeguimiento: (seg: Omit<Seguimiento, 'id' | 'created_at'>) => Seguimiento
  updateSeguimiento: (id: string, data: Partial<Seguimiento>) => void
  deleteSeguimiento: (id: string) => void
  toggleSeguimientoCompletado: (id: string) => void
  addCliente: (c: Omit<Cliente, 'id' | 'created_at'>) => Cliente
  updateCliente: (id: string, data: Partial<Cliente>) => void
  deleteCliente: (id: string) => void
  addTarea: (t: Omit<OperacionTarea, 'id' | 'created_at'>) => OperacionTarea
  updateTarea: (id: string, data: Partial<OperacionTarea>) => void
  toggleTareaCompletada: (id: string) => void
  deleteTarea: (id: string) => void
  resetToDemo: () => void
  clearAllData: () => void
  syncLocalToSupabase: () => Promise<{ success: boolean; message: string }>
}

const CRMContext = createContext<CRMContextType | undefined>(undefined)

const STORAGE_KEY = 'exposure_crm_data_v2'
const MODE_STORAGE_KEY = 'exposure_crm_mode'

export function CRMProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<CrmMode>('lite')
  const [layoutStyle, setLayoutStyleState] = useState<LayoutStyle>('cockpit')
  const [leads, setLeads] = useState<Lead[]>([])
  const [agendas, setAgendas] = useState<Agenda[]>([])
  const [ventas, setVentas] = useState<Venta[]>([])
  const [seguimientos, setSeguimientos] = useState<Seguimiento[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [tareas, setTareas] = useState<OperacionTarea[]>([])
  const [inversionAds, setInversionAdsState] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [supabaseConnected, setSupabaseConnected] = useState(false)
  const [supabaseLoading, setSupabaseLoading] = useState(isConfigured)
  const [supabaseError, setSupabaseError] = useState<string | null>(null)

  // Carga inicial: Supabase si esta configurado, o localStorage como fallback / demo
  const loadInitialData = useCallback(async () => {
    try {
      const storedLayout = localStorage.getItem('exposure_crm_layout_style') as LayoutStyle
      if (storedLayout) setLayoutStyleState(storedLayout)

      const storedMode = localStorage.getItem(MODE_STORAGE_KEY) as CrmMode
      if (storedMode === 'lite' || storedMode === 'pro') {
        setModeState(storedMode)
      }

      if (isConfigured && supabase) {
        setSupabaseLoading(true)
        try {
          const [
            leadsRes,
            agendasRes,
            ventasRes,
            seguimientosRes,
            clientesRes,
            tareasRes,
            configRes
          ] = await Promise.all([
            supabase.from('leads').select('*').order('created_at', { ascending: false }),
            supabase.from('agendas').select('*').order('created_at', { ascending: false }),
            supabase.from('ventas').select('*').order('created_at', { ascending: false }),
            supabase.from('seguimientos').select('*').order('created_at', { ascending: false }),
            supabase.from('clientes').select('*').order('created_at', { ascending: false }),
            supabase.from('operaciones_tareas').select('*').order('created_at', { ascending: false }),
            supabase.from('configuracion').select('*').eq('id', 'general').maybeSingle()
          ])

          const anyError = leadsRes.error || agendasRes.error || ventasRes.error || seguimientosRes.error || clientesRes.error || tareasRes.error

          if (anyError) {
            console.warn('[CRM] Error al leer de Supabase, usando respaldo local:', anyError.message)
            setSupabaseError('Error al conectar con Supabase: ' + anyError.message + '. Se estan usando los datos guardados en este navegador.')
            setSupabaseConnected(false)
            loadFromLocalStorage()
          } else {
            setLeads(leadsRes.data || [])
            setAgendas(agendasRes.data || [])
            setVentas(ventasRes.data || [])
            setSeguimientos(seguimientosRes.data || [])
            setClientes(clientesRes.data || [])
            setTareas(tareasRes.data || [])
            setInversionAdsState(Number(configRes.data?.inversion_ads) || 0)
            setSupabaseConnected(true)
            setSupabaseError(null)
          }
        } catch (err: any) {
          console.warn('[CRM] Fallo la llamada a Supabase:', err)
          setSupabaseError('No se pudo conectar a Supabase (' + (err?.message || 'Error de red') + '). Operando en modo local.')
          setSupabaseConnected(false)
          loadFromLocalStorage()
        } finally {
          setSupabaseLoading(false)
        }
      } else {
        loadFromLocalStorage()
      }
    } catch {
      loadFromLocalStorage()
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setLeads(parsed.leads || [])
        setAgendas(parsed.agendas || [])
        setVentas(parsed.ventas || [])
        setSeguimientos(parsed.seguimientos || [])
        setClientes(parsed.clientes || [])
        setTareas(parsed.tareas || [])
        setInversionAdsState(parsed.inversionAds || 0)
      } else {
        const now = new Date().toISOString()
        setLeads(INITIAL_LEADS.map(l => ({ ...l, created_at: now } as Lead)))
        setAgendas(INITIAL_AGENDAS.map(a => ({ ...a, created_at: now } as Agenda)))
        setVentas(INITIAL_VENTAS.map(v => ({ ...v, created_at: now } as Venta)))
        setSeguimientos(INITIAL_SEGUIMIENTOS.map(s => ({ ...s, created_at: now } as Seguimiento)))
        setClientes(INITIAL_CLIENTES.map(c => ({ ...c, created_at: now } as Cliente)))
        setTareas(INITIAL_TAREAS)
      }
    } catch {
      // Ignorar error de storage
    }
  }

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  // Respaldo continuo en localStorage (para modo demo y offline)
  useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        leads,
        agendas,
        ventas,
        seguimientos,
        clientes,
        tareas,
        inversionAds
      }))
    } catch {
      // Fallback
    }
  }, [leads, agendas, ventas, seguimientos, clientes, tareas, inversionAds, isLoaded])

  const setLayoutStyle = (s: LayoutStyle) => {
    setLayoutStyleState(s)
    try { localStorage.setItem('exposure_crm_layout_style', s) } catch {}
  }

  const setMode = (m: CrmMode) => {
    setModeState(m)
    try {
      localStorage.setItem(MODE_STORAGE_KEY, m)
    } catch {}
  }

  const dismissSupabaseError = () => {
    setSupabaseError(null)
  }

  const setInversionAds = (m: number) => {
    setInversionAdsState(m)
    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('configuracion').upsert({
        id: 'general',
        inversion_ads: m,
        updated_at: new Date().toISOString()
      }).then(({ error }) => {
        if (error) console.error('[Supabase] Error al guardar inversionAds:', error.message)
      })
    }
  }

  // Metricas Lite
  const metricasLite = useMemo<MetricasLite>(() => {
    const totalLeads = leads.length
    const totalAgendas = agendas.length
    const tasaAgenda = totalLeads > 0 ? Math.round((totalAgendas / totalLeads) * 100) : 0

    const totalShows = agendas.filter(a => a.show).length
    const showRate = totalAgendas > 0 ? Math.round((totalShows / totalAgendas) * 100) : 0

    const totalCalificadas = agendas.filter(a => a.califica).length
    const tasaCalificacion = totalShows > 0 ? Math.round((totalCalificadas / totalShows) * 100) : 0

    const totalVentas = ventas.length
    const closeRate = totalCalificadas > 0 ? Math.round((totalVentas / totalCalificadas) * 100) : 0

    const cashCollected = ventas.reduce((acc, v) => acc + (Number(v.cash_collected) || 0), 0)
    const ticketPromedio = totalVentas > 0 ? Math.round(cashCollected / totalVentas) : 0

    const saldosPendientes = ventas.reduce((acc, v) => acc + (Number(v.saldo_pendiente) || 0), 0)
    const calificadasAbiertas = agendas.filter(a => a.califica && !a.cerro).length
    const pipelineAbierto = saldosPendientes + (calificadasAbiertas * 1500)

    return {
      totalLeads,
      totalAgendas,
      tasaAgenda,
      totalShows,
      showRate,
      totalCalificadas,
      tasaCalificacion,
      totalVentas,
      closeRate,
      cashCollected,
      ticketPromedio,
      pipelineAbierto
    }
  }, [leads, agendas, ventas])

  // Metricas Pro
  const metricasPro = useMemo<MetricasPro>(() => {
    const saldosPendientes = ventas.reduce((acc, v) => acc + (Number(v.saldo_pendiente) || 0), 0)

    const FUENTES_LISTA: FuenteLead[] = ['organico', 'ads', 'outbound', 'youtube', 'referidos', 'otro']
    const fuentes: MetricasFuente[] = FUENTES_LISTA.map(fuente => {
      const fLeads = leads.filter(l => l.fuente === fuente).length
      const fAgendas = agendas.filter(a => a.fuente === fuente).length
      const fVentas = ventas.filter(v => v.fuente === fuente).length
      const fCash = ventas.filter(v => v.fuente === fuente).reduce((acc, v) => acc + (Number(v.cash_collected) || 0), 0)
      const tasaAgenda = fLeads > 0 ? Math.round((fAgendas / fLeads) * 100) : 0
      const tasaCierre = fAgendas > 0 ? Math.round((fVentas / fAgendas) * 100) : 0

      return {
        fuente,
        leads: fLeads,
        agendas: fAgendas,
        ventas: fVentas,
        cash: fCash,
        tasaAgenda,
        tasaCierre
      }
    })

    const clientesActivos = clientes.filter(c => c.estado === 'activo').length
    const clientesOnboarding = clientes.filter(c => c.estado === 'onboarding').length
    const clientesRiesgo = clientes.filter(c => c.salud === 'rojo' || c.salud === 'amarillo').length
    const clientesFinalizados = clientes.filter(c => c.estado === 'finalizado').length
    const progresoPromedioClientes = clientes.length > 0 
      ? Math.round(clientes.reduce((acc, c) => acc + c.progreso_pct, 0) / clientes.length) 
      : 0

    const tareasPendientes = tareas.filter(t => t.estado !== 'completado').length
    const tareasAltaPrioridad = tareas.filter(t => t.prioridad === 'alta' && t.estado !== 'completado').length
    const hoy = new Date().toISOString().split('T')[0]
    const tareasVencidas = tareas.filter(t => t.estado !== 'completado' && t.fecha_limite && t.fecha_limite < hoy).length

    return {
      ...metricasLite,
      saldosPendientes,
      fuentes,
      clientesActivos,
      clientesOnboarding,
      clientesRiesgo,
      clientesFinalizados,
      progresoPromedioClientes,
      tareasPendientes,
      tareasAltaPrioridad,
      tareasVencidas
    }
  }, [metricasLite, leads, agendas, ventas, clientes, tareas])

  // Acciones: LEADS
  const addLead = (data: Omit<Lead, 'id' | 'created_at'>): Lead => {
    const newLead: Lead = {
      ...data,
      id: generateUUID(),
      created_at: new Date().toISOString()
    }
    setLeads(prev => [newLead, ...prev])

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('leads').insert([cleanForSupabase(newLead)]).then(({ error }) => {
        if (error) console.error('[Supabase] Error al crear lead:', error.message)
      })
    }
    return newLead
  }

  const updateLead = (id: string, data: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...data } : l))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('leads').update(cleanForSupabase(data)).eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al actualizar lead:', error.message)
      })
    }
  }

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('leads').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al eliminar lead:', error.message)
      })
    }
  }

  // Acciones: AGENDAS
  const addAgenda = (data: Omit<Agenda, 'id' | 'created_at'>): Agenda => {
    const newAgenda: Agenda = {
      ...data,
      id: generateUUID(),
      created_at: new Date().toISOString()
    }
    setAgendas(prev => [newAgenda, ...prev])

    if (data.lead_id) {
      updateLead(data.lead_id, { estado: 'agendado' })
    }

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('agendas').insert([cleanForSupabase(newAgenda)]).then(({ error }) => {
        if (error) console.error('[Supabase] Error al crear agenda:', error.message)
      })
    }
    return newAgenda
  }

  const updateAgenda = (id: string, data: Partial<Agenda>) => {
    setAgendas(prev => prev.map(a => a.id === id ? { ...a, ...data } : a))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('agendas').update(cleanForSupabase(data)).eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al actualizar agenda:', error.message)
      })
    }
  }

  const deleteAgenda = (id: string) => {
    setAgendas(prev => prev.filter(a => a.id !== id))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('agendas').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al eliminar agenda:', error.message)
      })
    }
  }

  const toggleShow = (agendaId: string) => {
    const target = agendas.find(a => a.id === agendaId)
    if (!target) return
    const nextShow = !target.show
    const nextEstado = nextShow ? (target.califica ? 'calificada' : 'asistio') : 'no_show'

    setAgendas(prev => prev.map(a => {
      if (a.id !== agendaId) return a
      return {
        ...a,
        show: nextShow,
        estado: nextEstado
      }
    }))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('agendas').update({ show: nextShow, estado: nextEstado }).eq('id', agendaId).then(({ error }) => {
        if (error) console.error('[Supabase] Error al actualizar show:', error.message)
      })
    }
  }

  const toggleCalifica = (agendaId: string) => {
    const target = agendas.find(a => a.id === agendaId)
    if (!target) return
    const nextCalifica = !target.califica
    const nextShow = nextCalifica ? true : target.show
    const nextEstado = nextCalifica ? 'calificada' : (target.show ? 'asistio' : target.estado)

    setAgendas(prev => prev.map(a => {
      if (a.id !== agendaId) return a
      return {
        ...a,
        califica: nextCalifica,
        show: nextShow,
        estado: nextEstado
      }
    }))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('agendas').update({ califica: nextCalifica, show: nextShow, estado: nextEstado }).eq('id', agendaId).then(({ error }) => {
        if (error) console.error('[Supabase] Error al actualizar califica:', error.message)
      })
    }
  }

  // Acciones: VENTAS
  const addVenta = (data: Omit<Venta, 'id' | 'created_at'>): Venta => {
    const newVenta: Venta = {
      ...data,
      id: generateUUID(),
      created_at: new Date().toISOString()
    }
    setVentas(prev => [newVenta, ...prev])

    if (data.agenda_id) {
      updateAgenda(data.agenda_id, {
        cerro: true,
        show: true,
        califica: true,
        estado: 'venta_cerrada'
      })
    }

    const clienteExistente = clientes.find(c => c.nombre.toLowerCase() === data.cliente_nombre.toLowerCase())
    if (!clienteExistente) {
      const nuevoCliente: Cliente = {
        id: generateUUID(),
        venta_id: newVenta.id,
        nombre: data.cliente_nombre,
        producto: 'Programa High Ticket',
        fecha_ingreso: data.fecha,
        estado: 'onboarding',
        progreso_pct: 10,
        salud: 'verde',
        proxima_accion: 'Llamada de bienvenida / Onboarding',
        created_at: new Date().toISOString()
      }
      setClientes(prev => [nuevoCliente, ...prev])

      if (isConfigured && supabase && supabaseConnected) {
        supabase.from('clientes').insert([cleanForSupabase(nuevoCliente)]).then(({ error }) => {
          if (error) console.error('[Supabase] Error al crear cliente automatico:', error.message)
        })
      }
    }

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('ventas').insert([cleanForSupabase(newVenta)]).then(({ error }) => {
        if (error) console.error('[Supabase] Error al crear venta:', error.message)
      })
    }

    return newVenta
  }

  const deleteVenta = (id: string) => {
    setVentas(prev => prev.filter(v => v.id !== id))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('ventas').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al eliminar venta:', error.message)
      })
    }
  }

  // Acciones: SEGUIMIENTOS
  const addSeguimiento = (data: Omit<Seguimiento, 'id' | 'created_at'>): Seguimiento => {
    const newSeg: Seguimiento = {
      ...data,
      id: generateUUID(),
      created_at: new Date().toISOString()
    }
    setSeguimientos(prev => [newSeg, ...prev])

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('seguimientos').insert([cleanForSupabase(newSeg)]).then(({ error }) => {
        if (error) console.error('[Supabase] Error al crear seguimiento:', error.message)
      })
    }
    return newSeg
  }

  const updateSeguimiento = (id: string, data: Partial<Seguimiento>) => {
    setSeguimientos(prev => prev.map(s => s.id === id ? { ...s, ...data } : s))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('seguimientos').update(cleanForSupabase(data)).eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al actualizar seguimiento:', error.message)
      })
    }
  }

  const deleteSeguimiento = (id: string) => {
    setSeguimientos(prev => prev.filter(s => s.id !== id))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('seguimientos').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al eliminar seguimiento:', error.message)
      })
    }
  }

  const toggleSeguimientoCompletado = (id: string) => {
    const target = seguimientos.find(s => s.id === id)
    if (!target) return
    const nextEstado = target.estado === 'pendiente' ? 'realizado' : 'pendiente'

    setSeguimientos(prev => prev.map(s => {
      if (s.id !== id) return s
      return { ...s, estado: nextEstado }
    }))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('seguimientos').update({ estado: nextEstado }).eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al actualizar estado seguimiento:', error.message)
      })
    }
  }

  // Acciones: CLIENTES
  const addCliente = (data: Omit<Cliente, 'id' | 'created_at'>): Cliente => {
    const newCli: Cliente = {
      ...data,
      id: generateUUID(),
      created_at: new Date().toISOString()
    }
    setClientes(prev => [newCli, ...prev])

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('clientes').insert([cleanForSupabase(newCli)]).then(({ error }) => {
        if (error) console.error('[Supabase] Error al crear cliente:', error.message)
      })
    }
    return newCli
  }

  const updateCliente = (id: string, data: Partial<Cliente>) => {
    setClientes(prev => prev.map(c => c.id === id ? { ...c, ...data } : c))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('clientes').update(cleanForSupabase(data)).eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al actualizar cliente:', error.message)
      })
    }
  }

  const deleteCliente = (id: string) => {
    setClientes(prev => prev.filter(c => c.id !== id))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('clientes').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al eliminar cliente:', error.message)
      })
    }
  }

  // Acciones: TAREAS
  const addTarea = (data: Omit<OperacionTarea, 'id' | 'created_at'>): OperacionTarea => {
    const newT: OperacionTarea = {
      ...data,
      id: generateUUID(),
      created_at: new Date().toISOString()
    }
    setTareas(prev => [newT, ...prev])

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('operaciones_tareas').insert([cleanForSupabase(newT)]).then(({ error }) => {
        if (error) console.error('[Supabase] Error al crear tarea:', error.message)
      })
    }
    return newT
  }

  const updateTarea = (id: string, data: Partial<OperacionTarea>) => {
    setTareas(prev => prev.map(t => t.id === id ? { ...t, ...data } : t))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('operaciones_tareas').update(cleanForSupabase(data)).eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al actualizar tarea:', error.message)
      })
    }
  }

  const toggleTareaCompletada = (id: string) => {
    const target = tareas.find(t => t.id === id)
    if (!target) return
    const nextEstado = target.estado === 'completado' ? 'pendiente' : 'completado'

    setTareas(prev => prev.map(t => {
      if (t.id !== id) return t
      return { ...t, estado: nextEstado }
    }))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('operaciones_tareas').update({ estado: nextEstado }).eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al actualizar estado tarea:', error.message)
      })
    }
  }

  const deleteTarea = (id: string) => {
    setTareas(prev => prev.filter(t => t.id !== id))

    if (isConfigured && supabase && supabaseConnected) {
      supabase.from('operaciones_tareas').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('[Supabase] Error al eliminar tarea:', error.message)
      })
    }
  }

  // RESET Y LIMPIEZA
  const resetToDemo = () => {
    const now = new Date().toISOString()
    const demoLeads = INITIAL_LEADS.map(l => ({ ...l, id: generateUUID(), created_at: now } as Lead))
    const demoAgendas = INITIAL_AGENDAS.map(a => ({ ...a, id: generateUUID(), created_at: now } as Agenda))
    const demoVentas = INITIAL_VENTAS.map(v => ({ ...v, id: generateUUID(), created_at: now } as Venta))
    const demoSeguimientos = INITIAL_SEGUIMIENTOS.map(s => ({ ...s, id: generateUUID(), created_at: now } as Seguimiento))
    const demoClientes = INITIAL_CLIENTES.map(c => ({ ...c, id: generateUUID(), created_at: now } as Cliente))
    const demoTareas = INITIAL_TAREAS.map(t => ({ ...t, id: generateUUID(), created_at: now } as OperacionTarea))

    setLeads(demoLeads)
    setAgendas(demoAgendas)
    setVentas(demoVentas)
    setSeguimientos(demoSeguimientos)
    setClientes(demoClientes)
    setTareas(demoTareas)
    setInversionAdsState(0)

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        leads: demoLeads,
        agendas: demoAgendas,
        ventas: demoVentas,
        seguimientos: demoSeguimientos,
        clientes: demoClientes,
        tareas: demoTareas,
        inversionAds: 0
      }))
    } catch {}
  }

  const clearAllData = async () => {
    setLeads([])
    setAgendas([])
    setVentas([])
    setSeguimientos([])
    setClientes([])
    setTareas([])
    setInversionAdsState(0)

    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}

    if (isConfigured && supabase && supabaseConnected) {
      try {
        await Promise.all([
          supabase.from('operaciones_tareas').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
          supabase.from('seguimientos').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
          supabase.from('clientes').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
          supabase.from('ventas').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
          supabase.from('agendas').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
          supabase.from('leads').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
          supabase.from('configuracion').upsert({ id: 'general', inversion_ads: 0 })
        ])
      } catch (err) {
        console.error('[Supabase] Error al limpiar tablas remotas:', err)
      }
    }
  }

  // Sincronizar datos locales a Supabase
  const syncLocalToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    if (!isConfigured || !supabase || !supabaseConnected) {
      return { success: false, message: 'Supabase no está conectado o configurado.' }
    }

    try {
      if (leads.length > 0) {
        await supabase.from('leads').upsert(leads.map(l => cleanForSupabase(l)))
      }
      if (agendas.length > 0) {
        await supabase.from('agendas').upsert(agendas.map(a => cleanForSupabase(a)))
      }
      if (ventas.length > 0) {
        await supabase.from('ventas').upsert(ventas.map(v => cleanForSupabase(v)))
      }
      if (seguimientos.length > 0) {
        await supabase.from('seguimientos').upsert(seguimientos.map(s => cleanForSupabase(s)))
      }
      if (clientes.length > 0) {
        await supabase.from('clientes').upsert(clientes.map(c => cleanForSupabase(c)))
      }
      if (tareas.length > 0) {
        await supabase.from('operaciones_tareas').upsert(tareas.map(t => cleanForSupabase(t)))
      }
      await supabase.from('configuracion').upsert({ id: 'general', inversion_ads: inversionAds })

      return { success: true, message: '¡Datos sincronizados exitosamente con tu base de Supabase!' }
    } catch (err: any) {
      return { success: false, message: 'Error al sincronizar: ' + (err?.message || 'Error desconocido') }
    }
  }

  return (
    <CRMContext.Provider value={{
      layoutStyle,
      setLayoutStyle,
      mode,
      setMode,
      isConfigured,
      supabaseConnected,
      supabaseLoading,
      supabaseError,
      dismissSupabaseError,
      leads,
      agendas,
      ventas,
      seguimientos,
      clientes,
      tareas,
      inversionAds,
      setInversionAds,
      metricas: metricasLite,
      metricasLite,
      metricasPro,
      addLead,
      updateLead,
      deleteLead,
      addAgenda,
      updateAgenda,
      deleteAgenda,
      toggleShow,
      toggleCalifica,
      addVenta,
      deleteVenta,
      addSeguimiento,
      updateSeguimiento,
      deleteSeguimiento,
      toggleSeguimientoCompletado,
      addCliente,
      updateCliente,
      deleteCliente,
      addTarea,
      updateTarea,
      toggleTareaCompletada,
      deleteTarea,
      resetToDemo,
      clearAllData,
      syncLocalToSupabase
    }}>
      {children}
    </CRMContext.Provider>
  )
}

export function useCRM() {
  const context = useContext(CRMContext)
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider')
  }
  return context
}
