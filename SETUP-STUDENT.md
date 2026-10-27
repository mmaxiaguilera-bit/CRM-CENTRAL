# Guía de Instalación para Alumnos (Paso a Paso)

Esta guía está pensada para que puedas tener tu CRM funcionando aunque nunca antes hayas tocado una línea de código.

---

## Elegí tu camino:

- **CAMINO A**: Solo querés abrirlo y probar cómo funciona en tu computadora (5 minutos, sin cuentas ni configuraciones).
- **CAMINO B**: Querés conectarlo a tu propia base de datos gratuita de Supabase para cargar prospectos reales y compartirlos con tu equipo.
- **CAMINO C**: Querés dejarlo online en internet (con tu propio link de Vercel) para entrar desde el celular o desde cualquier lugar.

---

# 💻 CAMINO A: Solo Probarlo (Modo Demo)

1. **Descargá el template**:
   - Descargá el archivo `Exposure-CRM-Student-Template.zip` desde Skool (o cloná tu repositorio de GitHub) y descomprimilo en una carpeta de tu compu.
2. **Instalá Node.js**:
   - Entrá a [nodejs.org](https://nodejs.org) y descargá la versión recomendada (LTS).
   - Instálala haciendo click en *Siguiente -> Siguiente -> Finalizar*.
3. **Abrí la terminal en la carpeta**:
   - En Windows: Entrá a la carpeta del CRM, hacé click derecho en un espacio vacío y elegí *"Abrir en Terminal"*.
   - En Mac: Abrí Terminal y escribí `cd ` seguido de arrastrar la carpeta a la ventana.
4. **Instalá el proyecto**:
   Escribí el siguiente comando y apretá Enter:
   ```bash
   npm install
   ```
   *(Tarda 1 o 2 minutos mientras descarga los paquetes).*
5. **Iniciá el CRM**:
   Escribí:
   ```bash
   npm run dev
   ```
6. **Abrí tu navegador**:
   Entrá a [http://localhost:3000](http://localhost:3000).  
   ¡Listo! Estás en **Modo Demo**. Podés crear leads, agendar llamadas, mover prospectos en el pipeline y registrar ventas. Todo se guarda automáticamente en este navegador sin pedirte contraseñas.

---

# 🗄️ CAMINO B: Conectar tu propia Base de Datos (Supabase Gratuito)

Cuando quieras usarlo para tu negocio en serio y tener tus datos sincronizados en la nube de forma segura:

### 1. Creá tu cuenta en Supabase
- Entrá a [supabase.com](https://supabase.com) y registrate con tu email o GitHub (es 100% gratuito).

### 2. Creá un nuevo proyecto
- Hacé click en el botón verde **"New Project"**.
- Elegí un nombre (ej: *Mi Negocio CRM*) y una contraseña para la base de datos (anotala por las dudas).
- Seleccioná la región más cercana (ej: *São Paulo* o *US East*).
- Hacé click en **"Create new project"** y esperá 1 o 2 minutos a que termine de prepararse.

### 3. Creá las tablas y la seguridad (SQL Editor)
- En el menú lateral izquierdo de Supabase, hacé click en el ícono de **SQL Editor** (parece una consola con `>_`).
- Hacé click en **"New query"**.
- Abrí el archivo `supabase/schema.sql` de este proyecto, copiá TODO su contenido y pegalo en el editor de Supabase.
- Hacé click en el botón verde **"Run"** (o apretá `Ctrl + Enter`).
- Verás el mensaje *"Success. No rows returned"*. Las 7 tablas ya quedaron creadas con **Row Level Security (RLS)** activado.
- *(Opcional)*: Si querés poblar tu base con datos demo iniciales, hacé lo mismo con el archivo `supabase/seed.sql`.

### 4. Desactivá el registro público (Seguridad de tu equipo)
Como este CRM es de tu negocio, no querés que cualquiera que visite el sitio se cree una cuenta:
- En el menú izquierdo de Supabase, hacé click en **Authentication**.
- Andá a la pestaña **Sign In / Providers** (o **Providers** -> **Email** según la versión de Supabase).
- Desactivá la opción **"Allow new users to sign up"** (Permitir registro de nuevos usuarios).
- Guardá los cambios (**Save**).

### 5. Creá tu usuario de acceso
- En **Authentication**, andá a la pestaña **Users**.
- Hacé click en el botón **"Add user"** -> **"Create user"**.
- Ingresá tu email (ej: `admin@tunegocio.com`) y una contraseña segura.
- Confirmá haciendo click en **"Create user"**. Con este email y contraseña vas a entrar a tu CRM.

### 6. Copiá tus claves de conexión
- En Supabase, hacé click en el engranaje abajo a la izquierda (**Project Settings**).
- Andá a la sección **API** (debajo de Configuration).
- Vas a ver dos datos que necesitás copiar:
  1. **Project URL** (ej: `https://xyzabcdef.supabase.co`).
  2. **Project API Keys -> anon public** (una clave larga que empieza con `eyJ...`).
  - ⚠️ **ATENCIÓN**: NUNCA copies ni uses la clave `service_role`. Esa clave es privada y saltea toda la seguridad. El CRM solo necesita la clave `anon`.

### 7. Pegá tus claves en el archivo `.env.local`
- En la carpeta de tu CRM, duplicá el archivo `.env.example` y renombralo a `.env.local`.
- Abrí `.env.local` con cualquier editor de texto o bloc de notas y completá:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
  ```
- Guardá el archivo.

### 8. Reiniciá el CRM e iniciá sesión
- En tu terminal, apretá `Ctrl + C` para detener el servidor y volvé a escribir:
  ```bash
  npm run dev
  ```
- Al entrar a [http://localhost:3000](http://localhost:3000), el CRM detectará Supabase y te mostrará la pantalla de **Login**.
- Ingresá con el email y contraseña que creaste en el **Paso 5**.
- ¡Listo! En el header verás el cartel verde **"Supabase conectado"**.
- *(Opcional)*: Si antes cargaste prospectos en modo demo y querés pasarlos a tu base de Supabase, hacé click en el botón con la nube (**"Subir a Supabase"**) en el header.

---

# ☁️ CAMINO C: Dejarlo Online (Deploy en Vercel)

Para poder entrar a tu CRM desde tu celular o computadora sin tener la terminal abierta:

### 1. Creá tu repositorio privado en GitHub
- Entrá a [github.com/new](https://github.com/new).
- Poné como nombre `mi-crm`.
- ⚠️ **IMPORTANTE**: Seleccioná **Private (Privado)** para que nadie pueda ver tu código ni tu configuración.
- Subí los archivos de tu CRM a ese repositorio.

### 2. Conectá Vercel
- Entrá a [vercel.com](https://vercel.com) y creá tu cuenta con GitHub (gratis).
- Hacé click en **"Add New..."** -> **"Project"**.
- Buscá tu repositorio privado de GitHub y hacé click en **"Import"**.

### 3. Configurá las variables de entorno en Vercel
- En la pantalla previa al deploy, desplegá la sección **"Environment Variables"**.
- Agregá únicamente estas 2 variables (las mismas que pusiste en `.env.local`):
  1. `NEXT_PUBLIC_SUPABASE_URL` = tu URL de Supabase.
  2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` = tu anon key de Supabase.
- *(Recordatorio de seguridad: NUNCA agregues service_role en Vercel).*

### 4. Hacé click en "Deploy"
- En aproximadamente 1 minuto, Vercel compilará tu aplicación y te dará tu link público seguro (ej: `https://mi-crm.vercel.app`).
- Abrí el link, iniciá sesión con tu email y contraseña de Supabase, ¡y ya tenés tu CRM 100% online y seguro!
