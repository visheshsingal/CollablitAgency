import { useRouter } from 'next/router'
import BrandLogo from './BrandLogo.jsx'

export default function ClientSidebar({ name, onLogout }) {
  const router = useRouter()
  const items = [
    { href: '/client-dashboard', label: 'Overview', icon: '⌂' },
    { href: '/client-process', label: 'Project process', icon: '◌' },
    { href: '/client-documents', label: 'Documents', icon: '▣' },
    { href: '/client-meetings', label: 'Meetings', icon: '◷' },
  ]

  return <aside className="client-sidebar"><div className="sidebar-logo"><BrandLogo /></div><p className="sidebar-label">Client workspace</p><nav>{items.map((item) => <a href={item.href} className={router.asPath === item.href || (item.href === '/client-dashboard' && router.pathname === item.href) ? 'active' : ''} key={item.href}><i>{item.icon}</i>{item.label}</a>)}</nav><div className="sidebar-user"><span>{(name || 'C').charAt(0).toUpperCase()}</span><div><strong>{name || 'Client'}</strong><small>Client account</small></div></div><button className="sidebar-logout" onClick={onLogout}>Sign out</button><style jsx>{`
    .client-sidebar { position:fixed; inset:0 auto 0 0; z-index:20; width:245px; display:flex; flex-direction:column; padding:26px 18px 20px; background:#fff; border-right:1px solid #e4e7e2; }.sidebar-logo { padding:0 10px 25px; border-bottom:1px solid #edf0eb; }.brand-logo { display:block; width:150px; height:auto; max-height:55px; object-fit:contain; object-position:left center; }.sidebar-label { margin:27px 10px 10px; color:#9b7440; font-size:.68rem; font-weight:800; letter-spacing:.15em; text-transform:uppercase; }.client-sidebar nav { display:grid; gap:5px; }.client-sidebar nav a { display:flex; align-items:center; gap:12px; color:#78858d; border-radius:6px; padding:12px 10px; text-decoration:none; font-size:.86rem; font-weight:700; }.client-sidebar nav a:hover, .client-sidebar nav a.active { color:#173b5e; background:#eef3f1; }.client-sidebar nav i { width:19px; color:#c49343; font-style:normal; font-size:1.1rem; text-align:center; }.sidebar-user { display:flex; align-items:center; gap:10px; margin-top:auto; padding:14px 7px; border-top:1px solid #edf0eb; }.sidebar-user > span { display:grid; place-items:center; width:32px; height:32px; border-radius:50%; color:#fff; background:#173b5e; font-weight:700; }.sidebar-user strong, .sidebar-user small { display:block; max-width:140px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }.sidebar-user strong { color:#173b5e; font-size:.8rem; }.sidebar-user small { color:#9aa4a6; margin-top:3px; font-size:.7rem; }.sidebar-logout { border:0; background:transparent; color:#a16d2b; padding:10px 7px; text-align:left; font-weight:700; cursor:pointer; }
    @media (max-width:900px) { .client-sidebar { position:static; width:auto; min-height:0; padding:14px 16px; border-right:0; border-bottom:1px solid #e4e7e2; }.sidebar-logo { padding:0 0 12px; }.brand-logo { width:135px; }.sidebar-label { display:none; }.client-sidebar nav { display:flex; overflow:auto; gap:4px; }.client-sidebar nav a { white-space:nowrap; padding:9px 10px; }.sidebar-user { display:none; }.sidebar-logout { position:absolute; top:18px; right:16px; } }
  `}</style></aside>
}
