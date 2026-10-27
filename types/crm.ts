export type LayoutStyle = 'minimal' | 'cards' | 'sidebar' | 'cockpit' | 'kanban'
export type CrmMode = 'lite' | 'pro'

export type FuenteLead = 
  | 'organico' 
  | 'ads' 
  | 'outbound' 
  | 'youtube' 
  | 'referidos' 
  | 'otro'

export type EstadoLead = 
  | 'nuevo' 
  | 'en_conversacion' 
  | 'agendado' 
  | 'no_califica' 
  | 'perdido'

export type ScoreLead = 'frio' | 'tibio' | 'caliente'

export interface Lead {
  id: string
  nombre: string
  email: string
  telefono: string
  instagram: string
  fuente: FuenteLead
  campana?: string
  estado: EstadoLead
  ingreso_mensual?: string
  intentos_previos?: string
  urgencia?: string
  inversion_disponible?: string
  problema_actual?: string
  score: ScoreLead
  notas?: string
  created_at: string
}

export type EstadoAgenda = 
  | 'agendada' 
  | 'asistio' 
  | 'no_show' 
  | 'calificada' 
  | 'venta_cerrada' 
  | 'cancelada' 
  | 'perdida'

export interface Agenda {
  id: string
  lead_id?: string
  nombre: string
  email: string
  telefono: string
  instagram: string
  fecha_agenda: string
  hora_agenda: string
  setter: string
  closer: string
  fuente: FuenteLead
  show: boolean
  califica: boolean
  cerro: boolean
  estado: EstadoAgenda
  motivo_no_cierre?: string
  ingreso_mensual?: string
  intentos_previos?: string
  urgencia?: string
  inversion_disponible?: string
  problema_actual?: string
  notas_llamada?: string
  grabacion_url?: string
  created_at: string
}

export interface Venta {
  id: string
  agenda_id?: string
  lead_id?: string
  cliente_nombre: string
  fecha: string
  ticket_total: number
  cash_collected: number
  saldo_pendiente: number
  medio_de_pago: 'stripe' | 'transferencia' | 'crypto' | 'paypal' | 'efectivo' | 'otro'
  closer: string
  setter: string
  fuente: FuenteLead
  plan_cuotas: 'pago_unico' | '2_cuotas' | '3_cuotas' | 'recurrente'
  notas?: string
  created_at: string
}

export interface Seguimiento {
  id: string
  lead_id?: string
  agenda_id?: string
  nombre_contacto: string
  telefono: string
  fecha_proximo_contacto: string
  responsable: string
  estado: 'pendiente' | 'realizado' | 'cancelado'
  motivo: string
  notas?: string
  created_at: string
}

export type EstadoCliente = 'onboarding' | 'activo' | 'pausa' | 'finalizado' | 'cancelado'
export type SaludCliente = 'verde' | 'amarillo' | 'rojo'

export interface Cliente {
  id: string
  venta_id?: string
  nombre: string
  email?: string
  telefono?: string
  producto: string
  fecha_ingreso: string
  estado: EstadoCliente
  progreso_pct: number
  salud: SaludCliente
  proxima_accion?: string
  entregables_pendientes?: string
  notas?: string
  created_at: string
}

export type AreaTarea = 'ventas' | 'marketing' | 'producto' | 'administracion'
export type PrioridadTarea = 'alta' | 'media' | 'baja'
export type EstadoTarea = 'pendiente' | 'en_progreso' | 'completado'

export interface OperacionTarea {
  id: string
  tarea: string
  area: AreaTarea
  responsable: string
  prioridad: PrioridadTarea
  estado: EstadoTarea
  fecha_limite?: string
  notas?: string
  created_at: string
}

export interface MetricasFuente {
  fuente: FuenteLead
  leads: number
  agendas: number
  ventas: number
  cash: number
  tasaAgenda: number
  tasaCierre: number
}

export interface MetricasLite {
  totalLeads: number
  totalAgendas: number
  tasaAgenda: number
  totalShows: number
  showRate: number
  totalCalificadas: number
  tasaCalificacion: number
  totalVentas: number
  closeRate: number
  cashCollected: number
  ticketPromedio: number
  pipelineAbierto: number
}

export interface MetricasPro extends MetricasLite {
  saldosPendientes: number
  fuentes: MetricasFuente[]
  clientesActivos: number
  clientesOnboarding: number
  clientesRiesgo: number
  clientesFinalizados: number
  progresoPromedioClientes: number
  tareasPendientes: number
  tareasAltaPrioridad: number
  tareasVencidas: number
}
