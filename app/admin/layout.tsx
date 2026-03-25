import type { Metadata } from 'next'
import AdminNav from '@/components/admin/AdminNav'
import AdminGuard from '@/components/admin/AdminGuard'

export const metadata: Metadata = {
  title: 'NCDC Admin',
  description: 'Nalaikh City Development Corporation Content Management System',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        <main>
          {children}
        </main>
      </div>
    </AdminGuard>
  )
}
