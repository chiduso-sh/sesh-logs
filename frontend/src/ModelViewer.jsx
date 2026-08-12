import { useEffect, useRef } from 'react'
import { mountParallettes } from './parallettes'

// Decorative, ambient 3D accent. Purely presentational — reads no app state.
// three.js is loaded from a CDN (ESM) at runtime, so there's no npm dependency
// and it never blocks the app's first paint.
const THREE_CDN = 'https://unpkg.com/three@0.160.0/build/three.module.js'

export default function ModelViewer() {
  const canvasRef = useRef(null)

  useEffect(() => {
    let cleanup
    let cancelled = false
    import(/* @vite-ignore */ THREE_CDN).then((THREE) => {
      if (cancelled || !canvasRef.current) return
      cleanup = mountParallettes(canvasRef.current, THREE)
    })
    return () => {
      cancelled = true
      if (cleanup) cleanup()
    }
  }, [])

  return (
    <div className="model-stage" aria-hidden="true">
      <canvas ref={canvasRef} className="model-canvas"></canvas>
    </div>
  )
}
