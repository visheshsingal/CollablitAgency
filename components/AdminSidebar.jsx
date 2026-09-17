import Link from 'next/link'
import { useRouter } from 'next/router'

export default function AdminSidebar() {
  const router = useRouter()
  if (!router.pathname.startsWith('/admin')) return null

  const items = [
    { href: '/admin', label: 'Overview', icon: '◈' },
    { href: '/admin-leads', label: 'Leads', icon: '◎' },
    { href: '/admin-finance', label: 'Finance', icon: '₹' },
    { href: '/admin-clients', label: 'Client portals', icon: '▣' },
  ]

  return <aside className="admin-sidebar"><div className="sidebar-brand"><span>CS</span><strong>Operations</strong></div><nav>{items.map((item) => <Link href={item.href} className={router.pathname === item.href ? 'active' : ''} key={item.href}><i>{item.icon}</i>{item.label}</Link>)}</nav><style jsx>{`
    .admin-sidebar { position: fixed; z-index: 90; left: 18px; top: 50%; transform: translateY(-50%); width: 190px; padding: 18px 12px; background: #173b5e; border-radius: 9px; box-shadow: 0 18px 45px rgba(23,59,94,.2); }
    .sidebar-brand { display:flex; align-items:center; gap:9px; color:#fff; padding: 5px 9px 20px; border-bottom:1px solid rgba(255,255,255,.14); }.sidebar-brand span { display:grid; place-items:center; width:29px; height:29px; border-radius:50%; background:#d39b45; color:#173b5e; font-size:10px; font-weight:800; }.sidebar-brand strong { font-size: .82rem; letter-spacing:.03em; }
    nav { display:grid; gap:5px; padding-top:14px; } nav a { display:flex; align-items:center; gap:10px; color:rgba(255,255,255,.7); border-radius:5px; padding:10px 9px; text-decoration:none; font-size:.82rem; font-weight:700; } nav a:hover, nav a.active { color:#fff; background:rgba(255,255,255,.13); } nav i { width:20px; color:#d39b45; font-style:normal; text-align:center; font-size:1rem; }
    @media (max-width: 1100px) { .admin-sidebar { position: static; transform:none; width:auto; margin: 14px 16px 0; display:flex; align-items:center; gap:12px; padding:10px; }.sidebar-brand { padding:0 8px; border:0; }.sidebar-brand strong { display:none; } nav { display:flex; padding:0; gap:4px; overflow:auto; } nav a { white-space:nowrap; } }
  `}</style></aside>
}
