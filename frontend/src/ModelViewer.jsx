import { useEffect, useRef, useState } from 'react'
import { mountParallettes } from './parallettes'

// Decorative, ambient 3D accent + its own on/off switch. Purely presentational:
// the toggle is local state here, so App.jsx logic is never touched.
// three.js is loaded from a CDN (ESM) at runtime — no npm dependency.
const THREE_CDN = 'https://unpkg.com/three@0.160.0/build/three.module.js'

export default function ModelViewer() {
  const canvasRef = useRef(null)
  const [on, setOn] = useState(true)

  useEffect(() => {
    if (!on) return
    let cleanup
    let cancelled = false
    import(/* @vite-ignore */ THREE_CDN).then((THREE) => {
      if (cancelled || !canvasRef.current) return
      cleanup = mountParallettes(canvasRef.current, THREE, { variant: 'classic' })
    })
    return () => {
      cancelled = true
      if (cleanup) cleanup()
    }
  }, [on])

  return (
    <>
       {/* <button
        type="button"
        className="model-toggle"
        aria-pressed={on}
        onClick={() => setOn((v) => !v)}
      >
      {on ? 'You can turn it off 5ive ✌️' : '👀👀👀👀'}
      </button>  */}
      {on && (
        <div className="model-stage" aria-hidden="true">
          <canvas ref={canvasRef} className="model-canvas"></canvas>
        </div>
      )}
    </>
  )
}
