import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'Automexus - AI-Powered Business Automation Solutions'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
        }}
      >
        {/* Logo from animasyon_logo.svg */}
        <svg
          width="600"
          height="630"
          viewBox="0 0 47.43 51.48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#007bff', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#0099ff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#00ccff', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            fill="url(#logoGradient)"
            d="M40.48,50.73c-1.21,0-2.36-.74-2.81-1.95L23.71,11.54l-13.96,37.24c-.58,1.55-2.31,2.34-3.86,1.76-1.55-.58-2.34-2.31-1.76-3.86L20.9,1.95c.44-1.17,1.56-1.95,2.81-1.95s2.37.78,2.81,1.95l16.77,44.73c.58,1.55-.2,3.28-1.76,3.86-.35.13-.7.19-1.05.19Z"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
