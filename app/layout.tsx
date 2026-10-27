import type { Metadata } from "next"
import "./globals.css"
import { CRMProvider } from "@/context/crm-context"
import { CRMShell } from "@/components/layout/crm-shell"
import { AuthGuard } from "@/components/auth/auth-guard"

export const metadata: Metadata = {
  title: "CRM Exposure - Student Template",
  description: "Template oficial de CRM para alumnos de Exposure en Skool",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-[#070a10] text-slate-100 antialiased font-sans">
        <CRMProvider>
          <AuthGuard>
            <CRMShell>
              {children}
            </CRMShell>
          </AuthGuard>
        </CRMProvider>
      </body>
    </html>
  )
}
