// parallettes.js — builds and animates the ambient 3D parallettes.
// Pure scene logic, no app state. THREE is injected (loaded from CDN by the
// caller) so this module never bundles a copy. Returns a cleanup function.
export function mountParallettes(canvas, THREE, opts = {}) {
  const variant = opts.variant || 'classic' // 'classic' | 'pro'
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
  camera.position.set(0, 1.3, 5.4)
  camera.lookAt(0, 0.1, 0)

  // Lighting tuned for a brushed-silver read on a near-black ground:
  // a bright key, a cool bluish rim, a soft fill, and a hemisphere bounce.
  scene.add(new THREE.AmbientLight(0xffffff, 0.32))
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(3, 5, 4); scene.add(key)
  const rim = new THREE.DirectionalLight(0xc4ccff, 1.5); rim.position.set(-4, 2, -3); scene.add(rim)
  const fill = new THREE.DirectionalLight(0xffffff, 0.7); fill.position.set(0, -3, 2); scene.add(fill)
  scene.add(new THREE.HemisphereLight(0xffffff, 0x0b0b0e, 0.6))

  const metal = new THREE.MeshStandardMaterial({ color: 0xd6d6e0, metalness: 0.98, roughness: 0.3 })

  // CLASSIC: a horizontal grip on two straight legs with round feet + end caps.
  function unitClassic(z) {
    const u = new THREE.Group()
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.9, 32), metal)
    grip.rotation.z = Math.PI / 2
    grip.position.y = 0.9
    u.add(grip)
    for (const x of [-0.95, 0.95]) {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 24), metal)
      cap.position.set(x, 0.9, 0); u.add(cap)
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.9, 24), metal)
      leg.position.set(x * 0.82, 0.45, 0); u.add(leg)
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.06, 24), metal)
      foot.position.set(x * 0.82, 0.03, 0); u.add(foot)
    }
    u.position.z = z
    return u
  }

  // PRO: a shorter grip on splayed A-frame legs standing on long bar feet.
  function unitPro(z) {
    const u = new THREE.Group()
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.7, 32), metal)
    grip.rotation.z = Math.PI / 2
    grip.position.y = 0.95
    u.add(grip)
    for (const s of [-1, 1]) {
      const x = 0.8 * s
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.08, 24, 24), metal)
      cap.position.set(x, 0.95, 0); u.add(cap)
      // leg splayed outward from the grip end down to a wider stance
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.06, 24), metal)
      leg.position.set(x + 0.17 * s, 0.46, 0)
      leg.rotation.z = 0.32 * s
      u.add(leg)
      // long bar foot (runs along Z) for a planted, sturdy stance
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.07, 0.62), metal)
      foot.position.set(x + 0.34 * s, 0.035, 0); u.add(foot)
    }
    u.position.z = z
    return u
  }

  const unit = variant === 'pro' ? unitPro : unitClassic
  const group = new THREE.Group()
  group.add(unit(-0.62), unit(0.62))
  group.position.y = -0.45
  group.rotation.x = 0.2
  scene.add(group)

  function resize() {
    const w = canvas.clientWidth || 1
    const h = canvas.clientHeight || 1
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  let raf
  const t0 = performance.now()
  function frame(t) {
    if (!reduce) group.rotation.y = ((t - t0) / 1000) * 0.34 // slow: ~1 turn / 18s
    renderer.render(scene, camera)
    raf = requestAnimationFrame(frame)
  }
  if (reduce) {
    group.rotation.y = 0.6 // fixed 3/4 pose when motion is reduced
    renderer.render(scene, camera)
  } else {
    raf = requestAnimationFrame(frame)
  }

  return function cleanup() {
    cancelAnimationFrame(raf)
    ro.disconnect()
    scene.traverse((o) => { if (o.geometry) o.geometry.dispose() })
    metal.dispose()
    renderer.dispose()
  }
}
