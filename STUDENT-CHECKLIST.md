# Checklist del Alumno — Puesta en Marcha

Marcá cada casillero a medida que avances para certificar que tu CRM está 100% listo para operar:

---

## Fase 1: Instalación Básica
- [ ] Descargué el archivo ZIP del template desde Skool o usé el botón *"Use this template"* en GitHub.
- [ ] Instalé Node.js en mi computadora (versión 18+ LTS).
- [ ] Abrí la terminal en la carpeta del proyecto.
- [ ] Ejecuté `npm install` sin errores.
- [ ] Ejecuté `npm run dev` y abrí `http://localhost:3000`.

## Fase 2: Exploración en Modo Demo
- [ ] Vi el cartel *"Modo demo (se guarda en este navegador)"* en el header.
- [ ] Probé los 5 estilos visuales (Minimal, Cards, Sidebar, Cockpit, Kanban).
- [ ] Cambié entre **CRM Lite** y **CRM Pro**.
- [ ] Creé un Lead de prueba con el botón `+ Lead`.
- [ ] Agendé una llamada en el tablero de Pipeline.
- [ ] Marqué Show y Calificación en la llamada.
- [ ] Registré una Venta y vi cómo el Cash cobrado subió en tiempo real.
- [ ] Programé un Seguimiento con fecha límite.
- [ ] Probé el botón de borrar en agendas, ventas y seguimientos.

## Fase 3: Conexión con Supabase Propio (Base de datos real)
- [ ] Creé mi cuenta gratuita en [supabase.com](https://supabase.com).
- [ ] Creé un nuevo proyecto y anoté la contraseña de base de datos.
- [ ] Fui al **SQL Editor**, pegué el contenido de `supabase/schema.sql` y apreté **Run** (tablas + seguridad RLS listas).
- [ ] En **Authentication** -> **Sign In / Providers**, desactivé *"Allow new users to sign up"*.
- [ ] En **Authentication** -> **Users**, creé mi usuario con email y contraseña mediante *"Add user"*.
- [ ] Fui a **Project Settings** -> **API** y copié mi **Project URL** y mi **anon key** (NUNCA la service_role).
- [ ] Creé mi archivo `.env.local` y pegué las dos claves `NEXT_PUBLIC_...`.
- [ ] Reinicié el servidor (`npm run dev`).
- [ ] Me apareció la pantalla de **Login**, ingresé mis credenciales y vi el cartel verde **"Supabase conectado"**.
- [ ] *(Opcional)* Usé el botón de la nube para subir mis prospectos de demo a Supabase.

## Fase 4: Puesta en Producción (Vercel)
- [ ] Creé un repositorio **Privado** en GitHub y subí mi código.
- [ ] Creé mi cuenta en Vercel e importé el repositorio privado.
- [ ] Agregué en Environment Variables únicamente `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] Hice click en **Deploy** y obtuve mi link seguro.
- [ ] Ingresé desde mi celular con mi usuario y comprobé que mis datos sincronizan en tiempo real.

## Fase 5: Operación Comercial
- [ ] Vacié los datos de prueba con el botón *"Empezar de cero"* (ícono del tacho) para arrancar limpio.
- [ ] Cargué mis primeros prospectos reales.
- [ ] Tengo mis métricas de conversión (Show Rate, Close Rate, Cash cobrado) listas para la próxima llamada de coaching en Skool.
