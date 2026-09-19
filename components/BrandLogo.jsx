export default function BrandLogo({ compact = false, navbar = false }) {
  return <img
    src="https://plain-apac-prod-public.komododecks.com/202609/07/8eX4Xx73q4wTa2vJrgyB/image.png"
    alt="Collablit Solutions"
    className={compact ? 'brand-logo brand-logo-compact' : 'brand-logo'}
    style={navbar ? { width: 'auto', height: '38px', maxWidth: '170px' } : undefined}
  />
}
