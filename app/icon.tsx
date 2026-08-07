import { ImageResponse } from 'next/og'

/** Favicon: amber prompt caret on near-black. Generated, so there is no binary to track. */
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090a',
          color: '#f0b429',
          fontSize: 22,
          fontWeight: 700,
          fontFamily: 'ui-monospace, monospace',
          borderRadius: 6,
        }}
      >
        $_
      </div>
    ),
    size,
  )
}
