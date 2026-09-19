export default function BrandLogo({ compact = false, navbar = false, light = false }) {
  const height = compact ? 26 : navbar ? 38 : 40
  const maxWidth = compact ? 112 : navbar ? 170 : 180

  return (
    <img
      src="https://plain-apac-prod-public.komododecks.com/202609/07/8eX4Xx73q4wTa2vJrgyB/image.png"
      alt="Collablit Solutions"
      className={compact ? 'brand-logo brand-logo-compact' : 'brand-logo'}
      style={{
        display: 'block',
        width: 'auto',
        height,
        maxWidth,
        maxHeight: height,
        objectFit: 'contain',
        objectPosition: 'left center',
        filter: light ? 'brightness(0) invert(1)' : undefined,
      }}
    />
  )
}
