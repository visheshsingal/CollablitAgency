import Link from 'next/link'
import { useRouter } from 'next/router'
import BrandLogo from './BrandLogo.jsx'

export default function AdminSidebar() {
  const router = useRouter()
  if (!router.pathname.startsWith('/admin')) return null

  const items = [
    { href: '/admin', label: 'Overview', icon: '◈' },
    { href: '/admin-leads', label: 'Leads', icon: '◎' },
    { href: '/admin-finance', label: 'Finance', icon: '₹' },
  ]

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <BrandLogo compact />
        <strong>Operations</strong>
      </div>
      <nav>
        {items.map((item) => (
          <Link
            href={item.href}
            className={router.pathname === item.href ? 'active' : ''}
            key={item.href}
          >
            <i>{item.icon}</i>
            {item.label}
          </Link>
        ))}
      </nav>
      <style jsx>{`
        .admin-sidebar {
          display: none;
        }
      `}</style>
    </aside>
  )
}
