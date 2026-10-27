# Clase de Skool: Construí tu CRM con el Template de Exposure

> **Material de apoyo para la lección de Sistemas y Métricas en Skool.**  
> Este documento sirve como guía para el alumno y como guión de grabación para los instructores de Exposure.

---

## 1. ¿Qué vas a instalar hoy?

Vas a recibir una versión adaptada e independiente de nuestro propio sistema operativo de ventas (**Exposure OS**). 

Muchos alumnos cometen el error de usar hojas de cálculo desordenadas o pagar $100/mes por softwares genéricos que no entienden el flujo de llamadas de venta High Ticket (Leads → Agendas → Shows → Calificadas → Cierres → Cash).

Este template resuelve exactamente eso:
- Te da una estructura profesional desde el día 1.
- No te cobra mensualidades (utiliza el tier gratuito de Supabase y Vercel).
- Es 100% tuyo y privado: Exposure **no** tiene acceso a tus prospectos ni números.
- Te calcula las métricas estándar de Exposure para que traigas tus números a las llamadas de coaching.

---

## 2. ¿Qué métricas vas a medir?

Para poder ayudarte a diagnosticar tu negocio en las clases, todos los alumnos de Exposure usamos el mismo idioma:

1. **Leads**: Cuántas personas mostraron interés en tus contenidos o campañas.
2. **Agendas**: Cuántas llamadas lograste agendar en el calendario.
3. **Tasa de Agenda**: `(Agendas / Leads) * 100`. Te dice qué tan bueno es tu setter o tu gancho.
4. **Show Rate (Asistencia)**: `(Shows / Agendas) * 100`. Mide si tus prospectos realmente asisten a la llamada. Si está abajo del 65%, hay que ajustar recordatorios.
5. **Calificadas**: Prospectos que tienen el dinero, el problema real y el perfil para tu oferta.
6. **Tasa de Calificación**: `(Calificadas / Shows) * 100`. Mide la calidad de tus leads.
7. **Close Rate (Tasa de Cierre)**: `(Ventas / Calificadas) * 100`. Mide la efectividad del closer. La meta saludable es 20% a 30%+.
8. **Cash Collected**: El dinero real que entró a tu banco en el período (no promesas de pago).
9. **AOV (Ticket Promedio)**: Cuánto dinero cobrás en promedio por cada cliente cerrado.
10. **Pipeline Abierto**: El saldo pendiente de cuotas pactadas más ofertas presentadas con potencial de cierre.

---

## 3. CRM Lite vs CRM Pro: ¿Cuál usar?

En la barra superior del CRM vas a ver un botón para cambiar entre **Lite** y **Pro**:

- **Usá CRM Lite si estás empezando**:  
  Te muestra solo lo esencial para facturar: tus Leads, Agendas, Pipeline visual, Ventas y Seguimientos. Menos ruido mental, más foco en cerrar llamadas.
- **Usá CRM Pro si ya tenés equipo o volumen**:  
  Te activa 3 módulos adicionales:
  - **Marketing**: Para ver de dónde vienen tus ventas (¿Instagram orgánico, Ads de Meta, YouTube o Referidos?) e ingresar tu inversión publicitaria para medir ROI/ROAS.
  - **Clientes**: Para hacer seguimiento del Onboarding y ver la salud del cliente (Verde / Amarillo / Rojo).
  - **Operaciones**: Para coordinar tareas críticas con tu equipo y evitar cuellos de botella.

---

## 4. Los 5 Estilos Visuales

En el selector superior podés elegir el look & feel que más te motive trabajar:
- **Minimal**: Blanco y negro, limpio, estilo Notion / Linear.
- **Cards**: Tableros modulares con tarjetas fáciles de leer.
- **Sidebar CRM**: Barra lateral izquierda fija estilo software de agencia.
- **Cockpit (Command Center)**: Estética oscura con barras de progreso hacia tu meta mensual de facturación.
- **Kanban + Metrics**: Vista comercial orientada a mover tarjetas por etapas de llamada.

---

## 5. Modo Demo vs Supabase Conectado

- **Modo Demo**: No requiere ninguna configuración. Al abrir el proyecto, los datos se guardan en el navegador. Ideal para jugar y entender la dinámica.
- **Supabase Conectado**: Cuando copiás tus claves en `.env.local`, el CRM se conecta a tu base de datos de Supabase, se activa la pantalla de Login y se protegen todas las tablas con Row Level Security (RLS).
- **Empezar de Cero**: Con el botón del tacho de basura en el header podés vaciar todos los prospectos de prueba y arrancar tu CRM en blanco para tu negocio.
- **Subir a Supabase**: Si cargaste datos en modo demo y querés conservarlos al conectar Supabase, el botón con la nube te permite subirlos directamente sin reescribir nada.

---

## 6. Errores Frecuentes y Soluciones

### *"No me corre npm install"*
- **Causa**: No tenés Node.js instalado o tenés una versión muy vieja.
- **Solución**: Descargá la versión LTS desde [nodejs.org](https://nodejs.org) y reiniciá tu terminal.

### *"Cierro la terminal y la página se apaga"*
- **Causa**: Al correr localmente (`npm run dev`), el CRM vive mientras la terminal esté abierta.
- **Solución**: Seguí el **CAMINO C** de `SETUP-STUDENT.md` para subirlo a Vercel gratis y tenerlo online las 24 hs.

### *"¿Exposure ve mis prospectos o mis ingresos?"*
- **No**. La base de datos es 100% tuya en Supabase o en la memoria de tu computadora. Exposure no tiene ninguna llave de acceso. Solo traés tus números finales a las clases para que podamos coachearte.
