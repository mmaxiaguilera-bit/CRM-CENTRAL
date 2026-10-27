-- ==============================================================
-- DATOS DEMO FICTICIOS (100% SEGURO PARA ALUMNOS)
-- ==============================================================

-- Leads demo
insert into public.leads (nombre, email, telefono, instagram, fuente, campana, estado, ingreso_mensual, inversion_disponible, problema_actual, urgencia, score, notas)
values
('Carlos Méndez', 'carlos.m@ejemplo.com', '+54 9 11 4455-6677', '@carlos.growth', 'organico', 'Reel Caso Estudio', 'agendado', '$1,500 USD', '$3,000 USD', 'Estancado en prospección manual', 'Alta', 'caliente', 'Vio la masterclass completa'),
('Sofía Albarracín', 'sofia@disenomoderno.io', '+54 9 351 2233-445', '@sofiadesign', 'ads', 'Meta Ads VSL', 'agendado', '$2,000 USD', '$2,500 USD', 'Tiene clientes pero cobra poco', 'Media', 'caliente', 'Quiere pasar a high ticket'),
('Martín Palermo', 'martin@fitcoach.pro', '+54 9 221 7788-990', '@martincoach', 'outbound', 'DM setter', 'en_conversacion', '$800 USD', '$1,000 USD', 'No sabe cerrar por llamada', 'Alta', 'tibio', 'Seguimiento por WhatsApp'),
('Lucía Ramos', 'lucia@estudiocreativo.com', '+54 9 11 9988-7766', '@luciacreativa', 'youtube', 'Video Youtube Embudo', 'nuevo', '$3,500 USD', '$5,000 USD', 'Necesita equipo de setters', 'Media', 'caliente', 'Lead calificado de YouTube'),
('Ignacio Rossi', 'nachorossi@agencia.dev', '+54 9 341 5566-778', '@nachorossi', 'referidos', 'Alumno Cohorte 1', 'agendado', '$4,000 USD', '$4,000 USD', 'Quiere escalar a $10k/mes', 'Alta', 'caliente', 'Recomendado por Lucas');

-- Agendas demo
insert into public.agendas (nombre, email, telefono, instagram, fecha_agenda, hora_agenda, setter, closer, fuente, show, califica, cerro, estado, motivo_no_cierre, ingreso_mensual, inversion_disponible, notas_llamada)
values
('Carlos Méndez', 'carlos.m@ejemplo.com', '+54 9 11 4455-6677', '@carlos.growth', current_date, '15:00', 'Mateo', 'Joaquín', 'organico', true, true, true, 'venta_cerrada', null, '$1,500 USD', '$3,000 USD', 'Excelente llamada. Pagó seña en vivo.'),
('Sofía Albarracín', 'sofia@disenomoderno.io', '+54 9 351 2233-445', '@sofiadesign', current_date, '17:30', 'Mateo', 'Joaquín', 'ads', true, true, false, 'realizada_sin_cierre', 'Pidió consultar con su socia hasta mañana', '$2,000 USD', '$2,500 USD', 'Muy buen perfil, agendado seguimiento.'),
('Ignacio Rossi', 'nachorossi@agencia.dev', '+54 9 341 5566-778', '@nachorossi', current_date - interval '1 day', '19:00', 'Tomás', 'Joaquín', 'referidos', true, true, true, 'venta_cerrada', null, '$4,000 USD', '$4,000 USD', 'Cierre en 1 pago.'),
('Damián Herrera', 'damian@growthent.com', '+54 9 11 3322-1144', '@damianh', current_date - interval '2 days', '16:00', 'Tomás', 'Lucas', 'ads', false, false, false, 'no_show', 'No asistió a la llamada ni avisó', '$500 USD', '$500 USD', 'Reagendando por WhatsApp');

-- Ventas demo
insert into public.ventas (cliente_nombre, fecha, ticket_total, cash_collected, medio_de_pago, closer, setter, fuente, plan_cuotas, saldo_pendiente, notas)
values
('Carlos Méndez', current_date, 2000, 1000, 'stripe', 'Joaquín', 'Mateo', 'organico', '2_cuotas', 1000, 'Seña de $1,000 USD. Saldo a 30 días.'),
('Ignacio Rossi', current_date - interval '1 day', 2500, 2500, 'transferencia', 'Joaquín', 'Tomás', 'referidos', 'pago_unico', 0, 'Pago total completado.');

-- Seguimientos demo
insert into public.seguimientos (nombre_contacto, telefono, fecha_proximo_contacto, responsable, estado, motivo, notas)
values
('Sofía Albarracín', '+54 9 351 2233-445', current_date + interval '1 day', 'Joaquín', 'pendiente', 'Decisión con socia', 'Llamar a las 11:00 hs para destrabar dudas'),
('Damián Herrera', '+54 9 11 3322-1144', current_date, 'Tomás', 'pendiente', 'No show', 'Mandar audio de WhatsApp ofreciendo nuevo horario');

-- Clientes demo
insert into public.clientes (nombre, email, telefono, producto, fecha_ingreso, estado, progreso_pct, salud, proxima_accion, notas)
values
('Ignacio Rossi', 'nachorossi@agencia.dev', '+54 9 341 5566-778', 'Programa High Ticket 1-a-1', current_date - interval '1 day', 'onboarding', 25, 'verde', 'Llamada de bienvenida y acceso a Drive', 'Cliente con muy buen ritmo'),
('Carlos Méndez', 'carlos.m@ejemplo.com', '+54 9 11 4455-6677', 'Programa High Ticket 1-a-1', current_date, 'onboarding', 10, 'verde', 'Configurar plataforma y enviar formulario', 'Pagó cuota 1');

-- Tareas operativas demo
insert into public.operaciones_tareas (tarea, area, responsable, prioridad, estado, fecha_limite, notas)
values
('Revisar guion del setter para mejorar tasa de agenda', 'ventas', 'Joaquín', 'alta', 'pendiente', current_date + interval '2 days', 'Foco en objeción de precio inicial'),
('Crear 3 ganchos nuevos para Meta Ads', 'marketing', 'Mateo', 'media', 'en_progreso', current_date + interval '4 days', 'VSL y carrusel'),
('Onboarding llamada 1 a 1 de Ignacio Rossi', 'producto', 'Facundo', 'alta', 'pendiente', current_date + interval '1 day', 'Kickoff call'),
('Conciliar cobros de Stripe y transferencias de la semana', 'administracion', 'Tomás', 'baja', 'completado', current_date - interval '1 day', 'Todo en orden');
