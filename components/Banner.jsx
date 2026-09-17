export default function Banner({ imageUrl, title, highlight, description, height = '300px' }) {
  const titleParts = highlight ? title.split(highlight) : [title]

  return (
    <section
      className="banner"
      style={{
        '--banner-height': height,
      }}
    >
      <img className="banner-image" src={imageUrl} alt="" aria-hidden="true" />
      <div className="banner-overlay" />
      <div className="banner-content">
        <h1>
          {titleParts[0]}
          {highlight && <span className="highlight">{highlight}</span>}
          {titleParts[1]}
        </h1>
        {description && <p>{description}</p>}
      </div>

      <style jsx>{`
        .banner {
          position: relative;
          display: grid;
          place-items: center;
          min-height: var(--banner-height);
          overflow: hidden;
          isolation: isolate;
          background: #102849;
        }

        .banner-image,
        .banner-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .banner-image {
          z-index: -2;
          object-fit: cover;
          object-position: center;
        }

        .banner-overlay {
          z-index: -1;
          background: rgba(18, 57, 105, 0.58);
        }

        .banner-content {
          position: relative;
          z-index: 1;
          max-width: 900px;
          padding: 28px 24px;
          text-align: center;
        }

        h1 {
          margin: 0 0 12px;
          color: #fff;
          font-family: 'Fraunces', serif;
          font-size: clamp(2rem, 5vw, 4.2rem);
          line-height: 1.08;
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.3);
        }

        .highlight {
          color: #f1ca57;
        }

        p {
          max-width: 720px;
          margin: 0 auto;
          color: rgba(255, 255, 255, 0.94);
          font-size: clamp(0.95rem, 1.8vw, 1.12rem);
          line-height: 1.65;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.32);
        }
      `}</style>
    </section>
  )
}
