# Exposure CRM — Student Template

> **El sistema operativo comercial oficial de Exposure adaptado para alumnos de Skool.**  
> Diseñado para que puedas trazabilizar tus ventas, medir tus métricas oficiales, llevar el control de clientes y operaciones, y traer tus números a las mentorías.

---

## ⚡ Características Principales

- **100% Independiente y Privado**: Tu base de datos es tuya. Exposure **no** tiene acceso a tus prospectos, números ni clientes.
- **Funciona Sin Configuración Previa (Modo Demo)**: Podés clonar o descargar el proyecto y usarlo de inmediato en tu navegador con datos ficticios para aprender a usarlo antes de conectar tu base.
- **Persistencia Real en Supabase con Login Seguro**: Cuando pegás tus credenciales, se activa la conexión en vivo con Supabase, la pantalla de Login con Supabase Auth y la seguridad Row Level Security (RLS) en todas las tablas.
- **Métricas Oficiales de Exposure**: Leads, Agendas, Show Rate, Calificadas, Close Rate, Cash Cobrado, AOV (Ticket Promedio) y Pipeline Abierto calculados automáticamente con las mismas fórmulas que usamos en las clases.
- **2 Modos de Complejidad (Lite vs Pro)**:
  - **CRM Lite**: Enfocado en la venta pura (Leads, Agendas, Pipeline Kanban, Ventas, Seguimientos y Dirección Lite).
  - **CRM Pro**: Para agencias y negocios con equipo (agrega Hub de Marketing con atribución por canal y ROI de anuncios, Hub de Clientes con Onboarding/Salud, Hub de Operaciones y Dirección Pro).
- **5 Estilos Visuales Intercambiables**:
  1. **Minimal**: Limpio, tipográfico, estilo Notion / Linear moderno.
  2. **Cards Dashboard**: Tarjetas visuales modulares de fácil lectura.
  3. **Sidebar CRM**: SaaS clásico con navegación lateral para productividad.
  4. **Cockpit (Command Center)**: Look oscuro futurista inspirado en Exposure OS con metas en progreso y HUD de comando.
  5. **Kanban + Metrics**: Foco total en el pipeline comercial con dock de métricas en vivo.

---

## 🚀 Inicio Rápido (En 3 Minutos)

### Requisitos Mínimos
- Tener instalado [Node.js](https://nodejs.org) (versión 18 o superior).

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el CRM
```bash
npm run dev
```
Abrí [http://localhost:3000](http://localhost:3000) en tu navegador. ¡Listo! Ya estás en el **Modo Demo** (los datos se guardan en tu navegador sin pedir login).

---

## 🔒 Conectar tu propia Base de Datos (Supabase Gratuito)

Cuando quieras cargar tus datos reales:
1. Creá tu cuenta gratis en [supabase.com](https://supabase.com) y creá un nuevo proyecto.
2. En Supabase, entrá a **SQL Editor** -> **New query**, pegá el contenido de `supabase/schema.sql` y hacé click en **Run**.
3. Desactivá el registro público en **Authentication** -> **Sign In / Providers** (o **Email**) -> desactivá *"Allow new users to sign up"*.
4. Creá tu usuario de acceso en **Authentication** -> **Users** -> **Add user** -> **Create user**.
5. Copiá tu **Project URL** y tu clave pública **anon key** (nunca copies la `service_role`) desde **Project Settings** -> **API**.
6. Creá tu archivo `.env.local` duplicando `.env.example` y pegá tus 2 claves:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
   ```
7. Reiniciá el servidor (`npm run dev`).
8. Ingresá con el email y contraseña creados en el paso 4.
9. En el header verás el cartel verde **"Supabase Conectado"**.

---

## 📖 Documentación para Alumnos

- [Guía Paso a Paso para No Técnicos (SETUP-STUDENT.md)](./SETUP-STUDENT.md)
- [Guión y Material de la Clase de Skool (SKOOL-GUIDE.md)](./SKOOL-GUIDE.md)
- [Checklist de Puesta en Marcha (STUDENT-CHECKLIST.md)](./STUDENT-CHECKLIST.md)

---

## 🛡️ Privacidad y Seguridad
Este template no incluye ninguna API key, token o dato real de Exposure. Todo el almacenamiento ocurre localmente en tu navegador (modo demo) o en tu propia cuenta privada de Supabase protegida por Row Level Security.
