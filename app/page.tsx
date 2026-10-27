"use client"

import Link from 'next/link'
import { 
  Users, Calendar, PhoneCall, CheckCircle2, DollarSign, 
  TrendingUp, Clock, AlertCircle, ArrowUpRight, Plus, 
  ChevronRight, Sparkles, Megaphone, UserCheck, CheckSquare
} from "lucide-react"
import { useCRM } from "@/context/crm-context"

export default function DashboardDireccionPage() {
  const { mode, metricasLite, metricasPro, ventas, seguimientos } = useCRM()

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* BANNER DE CABECERA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#111726] to-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
              mode === 'pro' 
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}>
              {mode === 'pro' ? 'Dirección Pro' : 'Dirección Lite'}
            </span>
            <span className="text-xs text-slate-400">
              {mode === 'pro' ? 'Control Integral 360° (Ventas, Marketing, Clientes, Operaciones)' : 'Control Ejecutivo de Ventas'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1.5">
            {mode === 'pro' ? 'Panel de Dirección del Negocio' : 'Métricas del Negocio y Conversión Comercial'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Usá estos números para reportar tu estado en las clases de Exposure.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/pipeline"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold transition shadow-lg shadow-emerald-500/10"
          >
            <span>Ver Pipeline</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* KPIS PRINCIPALES (COMUNES A LITE Y PRO) */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>1. Leads Totales</span>
            <Users className="h-4 w-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{metricasLite.totalLeads}</div>
          <div className="text-[11px] text-slate-500 mt-1">Contactos en base</div>
        </div>

        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>2. Agendas</span>
            <Calendar className="h-4 w-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{metricasLite.totalAgendas}</div>
          <div className="text-[11px] text-purple-400 mt-1">Tasa Agenda: {metricasLite.tasaAgenda}%</div>
        </div>

        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>3. Show Rate</span>
            <PhoneCall className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400">{metricasLite.showRate}%</div>
          <div className="text-[11px] text-slate-500 mt-1">{metricasLite.totalShows} de {metricasLite.totalAgendas} asistieron</div>
        </div>

        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>4. Calificadas</span>
            <CheckCircle2 className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{metricasLite.totalCalificadas}</div>
          <div className="text-[11px] text-amber-400 mt-1">Tasa Calif.: {metricasLite.tasaCalificacion}%</div>
        </div>

        <div className="p-4 rounded-xl bg-[#111726] border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>5. Close Rate</span>
            <TrendingUp className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-cyan-400">{metricasLite.closeRate}%</div>
          <div className="text-[11px] text-slate-500 mt-1">{metricasLite.totalVentas} cierres / {metricasLite.totalCalificadas} calif.</div>
        </div>

        <div className="p-4 rounded-xl bg-[#111726] border border-emerald-500/20 bg-gradient-to-b from-emerald-500/10 to-transparent">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold">
            <span>6. Cash Cobrado</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-400">
            $${metricasLite.cashCollected.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Ticket Prom: $${metricasLite.ticketPromedio.toLocaleString()}</div>
        </div>
      </section>

      {/* BLOQUE PRO ADICIONAL: FUENTES, CLIENTES Y OPERACIONES */}
      {mode === 'pro' && (
        <section className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Métricas Avanzadas (Modo Pro)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* RESUMEN MARKETING */}
            <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
                  <Megaphone className="h-4 w-4" />
                  Top Canales de Ingresos
                </span>
                <Link href="/marketing" className="text-xs text-purple-400 hover:underline">Ver detalle</Link>
              </div>
              <div className="space-y-2 pt-1">
                {metricasPro.fuentes.filter(f => f.cash > 0).slice(0, 3).map(f => (
                  <div key={f.fuente} className="flex items-center justify-between text-xs">
                    <span className="capitalize text-slate-300">{f.fuente}</span>
                    <span className="font-bold text-white">$${f.cash.toLocaleString()} ({f.ventas} ventas)</span>
                  </div>
                ))}
                {metricasPro.fuentes.filter(f => f.cash > 0).length === 0 && (
                  <div className="text-xs text-slate-500">Sin ventas atribuidas</div>
                )}
              </div>
            </div>

            {/* RESUMEN CLIENTES */}
            <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <UserCheck className="h-4 w-4" />
                  Estado de Clientes
                </span>
                <Link href="/clientes" className="text-xs text-emerald-400 hover:underline">Ver clientes</Link>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Activos</div>
                  <div className="font-bold text-white text-base">{metricasPro.clientesActivos}</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">En Onboarding</div>
                  <div className="font-bold text-blue-400 text-base">{metricasPro.clientesOnboarding}</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-red-500/20 bg-red-500/5 col-span-2">
                  <div className="text-red-400">En Riesgo (Salud crítica)</div>
                  <div className="font-bold text-red-400 text-base">{metricasPro.clientesRiesgo}</div>
                </div>
              </div>
            </div>

            {/* RESUMEN OPERACIONES */}
            <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                  <CheckSquare className="h-4 w-4" />
                  Cuellos de Botella
                </span>
                <Link href="/operaciones" className="text-xs text-blue-400 hover:underline">Ver tareas</Link>
              </div>
              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Tareas Pendientes:</span>
                  <span className="font-bold text-white">{metricasPro.tareasPendientes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-400">Alta Prioridad:</span>
                  <span className="font-bold text-red-400">{metricasPro.tareasAltaPrioridad}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400">Tareas Vencidas:</span>
                  <span className="font-bold text-amber-400">{metricasPro.tareasVencidas}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BLOQUE INFERIOR: VENTAS Y SEGUIMIENTOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              Últimas Ventas ({ventas.length})
            </h3>
            <Link href="/ventas" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
              <span>Ver todas</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80">
            {ventas.slice(0, 4).map(v => (
              <div key={v.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white">{v.cliente_nombre}</div>
                  <div className="text-[11px] text-slate-500">{v.fecha} • Closer: {v.closer} • {v.medio_de_pago}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400">+$${v.cash_collected.toLocaleString()}</div>
                  {v.saldo_pendiente > 0 && (
                    <div className="text-[10px] text-amber-400/80">Resta: $${v.saldo_pendiente.toLocaleString()}</div>
                  )}
                </div>
              </div>
            ))}
            {ventas.length === 0 && (
              <div className="py-6 text-center text-xs text-slate-500">No hay ventas registradas aún</div>
            )}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              Seguimientos Pendientes ({seguimientos.filter(s => s.estado === 'pendiente').length})
            </h3>
            <Link href="/seguimientos" className="text-xs text-amber-400 hover:underline flex items-center gap-1">
              <span>Ver cola</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80">
            {seguimientos.filter(s => s.estado === 'pendiente').slice(0, 4).map(s => (
              <div key={s.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white">{s.nombre_contacto}</div>
                  <div className="text-[11px] text-slate-500">{s.motivo} • {s.responsable}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {s.fecha_proximo_contacto}
                  </span>
                </div>
              </div>
            ))}
            {seguimientos.filter(s => s.estado === 'pendiente').length === 0 && (
              <div className="py-6 text-center text-xs text-slate-500">No hay seguimientos pendientes</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
