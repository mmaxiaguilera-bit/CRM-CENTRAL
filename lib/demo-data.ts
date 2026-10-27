export interface Lead {
  id: string
  nombre: string
  email: string
  telefono: string
  instagram: string
  fuente: string
  campana?: string
  estado: string
  ingreso_mensual?: string
  inversion_disponible?: string
  score: 'frio' | 'tibio' | 'caliente'
  notas?: string
}

export interface Agenda {
  id: string
  nombre: string
  email: string
  telefono: string
  instagram: string
  fecha_agenda: string
  hora_agenda: string
  setter: string
  closer: string
  fuente: string
  show: boolean
  califica: boolean
  cerro: boolean
  estado: string
  notas_llamada?: string
}

export interface Venta {
  id: string
  cliente_nombre: string
  fecha: string
  ticket_total: number
  cash_collected: number
  medio_de_pago: string
  closer: string
  setter: string
  fuente: string
  plan_cuotas: string
  saldo_pendiente: number
}

export interface Seguimiento {
  id: string
  nombre_contacto: string
  telefono: string
  fecha_proximo_contacto: string
  responsable: string
  estado: string
  motivo: string
  notas?: string
}

export interface Cliente {
  id: string
  nombre: string
  email: string
  telefono: string
  producto: string
  fecha_ingreso: string
  estado: string
  progreso_pct: number
  salud: 'verde' | 'amarillo' | 'rojo'
  proxima_accion?: string
}

export const DEMO_LEADS: Lead[] = [
  { id: '1', nombre: 'Carlos Méndez', email: 'carlos.m@ejemplo.com', telefono: '+54 9 11 4455-6677', instagram: '@carlos.growth', fuente: 'organico', estado: 'agendado', ingreso_mensual: '$1,500', inversion_disponible: '$3,000', score: 'caliente', notas: 'Vio masterclass completa' },
  { id: '2', nombre: 'Sofía Albarracín', email: 'sofia@disenomoderno.io', telefono: '+54 9 351 2233-445', instagram: '@sofiadesign', fuente: 'ads', estado: 'agendado', ingreso_mensual: '$2,000', inversion_disponible: '$2,500', score: 'caliente', notas: 'Quiere pasar a high ticket' },
  { id: '3', nombre: 'Martín Palermo', email: 'martin@fitcoach.pro', telefono: '+54 9 221 7788-990', instagram: '@martincoach', fuente: 'outbound', estado: 'en_conversacion', ingreso_mensual: '$800', inversion_disponible: '$1,000', score: 'tibio', notas: 'Seguimiento por WhatsApp' },
  { id: '4', nombre: 'Lucía Ramos', email: 'lucia@estudiocreativo.com', telefono: '+54 9 11 9988-7766', instagram: '@luciacreativa', fuente: 'youtube', estado: 'nuevo', ingreso_mensual: '$3,500', inversion_disponible: '$5,000', score: 'caliente', notas: 'Lead de YouTube' },
  { id: '5', nombre: 'Ignacio Rossi', email: 'nachorossi@agencia.dev', telefono: '+54 9 341 5566-778', instagram: '@nachorossi', fuente: 'referidos', estado: 'agendado', ingreso_mensual: '$4,000', inversion_disponible: '$4,000', score: 'caliente', notas: 'Recomendado por Lucas' }
]

export const DEMO_AGENDAS: Agenda[] = [
  { id: '1', nombre: 'Carlos Méndez', email: 'carlos.m@ejemplo.com', telefono: '+54 9 11 4455-6677', instagram: '@carlos.growth', fecha_agenda: '2026-10-06', hora_agenda: '15:00', setter: 'Mateo', closer: 'Joaquín', fuente: 'organico', show: true, califica: true, cerro: true, estado: 'venta_cerrada', notas_llamada: 'Pagó seña en vivo' },
  { id: '2', nombre: 'Sofía Albarracín', email: 'sofia@disenomoderno.io', telefono: '+54 9 351 2233-445', instagram: '@sofiadesign', fecha_agenda: '2026-10-06', hora_agenda: '17:30', setter: 'Mateo', closer: 'Joaquín', fuente: 'ads', show: true, califica: true, cerro: false, estado: 'realizada_sin_cierre', notas_llamada: 'Decide con socia' },
  { id: '3', nombre: 'Ignacio Rossi', email: 'nachorossi@agencia.dev', telefono: '+54 9 341 5566-778', instagram: '@nachorossi', fecha_agenda: '2026-10-05', hora_agenda: '19:00', setter: 'Tomás', closer: 'Joaquín', fuente: 'referidos', show: true, califica: true, cerro: true, estado: 'venta_cerrada', notas_llamada: 'Pago completo' },
  { id: '4', nombre: 'Damián Herrera', email: 'damian@growthent.com', telefono: '+54 9 11 3322-1144', instagram: '@damianh', fecha_agenda: '2026-10-04', hora_agenda: '16:00', setter: 'Tomás', closer: 'Lucas', fuente: 'ads', show: false, califica: false, cerro: false, estado: 'no_show', notas_llamada: 'No asistió' }
]

export const DEMO_VENTAS: Venta[] = [
  { id: '1', cliente_nombre: 'Carlos Méndez', fecha: '2026-10-06', ticket_total: 2000, cash_collected: 1000, medio_de_pago: 'stripe', closer: 'Joaquín', setter: 'Mateo', fuente: 'organico', plan_cuotas: '2_cuotas', saldo_pendiente: 1000 },
  { id: '2', cliente_nombre: 'Ignacio Rossi', fecha: '2026-10-05', ticket_total: 2500, cash_collected: 2500, medio_de_pago: 'transferencia', closer: 'Joaquín', setter: 'Tomás', fuente: 'referidos', plan_cuotas: 'pago_unico', saldo_pendiente: 0 }
]

export const DEMO_SEGUIMIENTOS: Seguimiento[] = [
  { id: '1', nombre_contacto: 'Sofía Albarracín', telefono: '+54 9 351 2233-445', fecha_proximo_contacto: '2026-10-07', responsable: 'Joaquín', estado: 'pendiente', motivo: 'Decisión socia', notas: 'Destrabar objeción precio' },
  { id: '2', nombre_contacto: 'Damián Herrera', telefono: '+54 9 11 3322-1144', fecha_proximo_contacto: '2026-10-06', responsable: 'Tomás', estado: 'pendiente', motivo: 'No show', notas: 'Reagendar por WhatsApp' }
]

export const DEMO_CLIENTES: Cliente[] = [
  { id: '1', nombre: 'Ignacio Rossi', email: 'nachorossi@agencia.dev', telefono: '+54 9 341 5566-778', producto: 'Programa High Ticket', fecha_ingreso: '2026-10-05', estado: 'onboarding', progreso_pct: 25, salud: 'verde', proxima_accion: 'Kickoff call' },
  { id: '2', nombre: 'Carlos Méndez', email: 'carlos.m@ejemplo.com', telefono: '+54 9 11 4455-6677', producto: 'Programa High Ticket', fecha_ingreso: '2026-10-06', estado: 'onboarding', progreso_pct: 10, salud: 'verde', proxima_accion: 'Formulario inicial' }
]
