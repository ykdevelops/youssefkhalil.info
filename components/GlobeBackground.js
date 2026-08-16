'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const DESKTOP_BREAKPOINT = 768

export default function GlobeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const isMobile = window.innerWidth < DESKTOP_BREAKPOINT

    /*
     * SCENE
     */
    const scene = new THREE.Scene()

    /*
     * CAMERA
     *
     * Narrower FOV helps the background feel
     * spherical instead of like a cylindrical tunnel.
     */
    const camera = new THREE.PerspectiveCamera(
      62,
      window.innerWidth / window.innerHeight,
      0.1,
      400
    )

    camera.position.set(0, 0, 0)
    camera.rotation.set(0, 0, 0)

    /*
     * RENDERER
     */
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
    })

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        isMobile ? 1.15 : 1.5
      )
    )

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )

    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace

    mount.appendChild(renderer.domElement)

    /*
     * GLOBE
     *
     * Camera remains inside the sphere, but the
     * sphere's center is pushed behind the camera.
     *
     * This makes both latitude and longitude lines
     * visibly curve and creates a spherical feeling.
     */
    const globe = new THREE.Group()

    const radius = isMobile ? 115 : 140

    /*
     * Move the center of the sphere away from
     * the camera.
     *
     * The camera is still safely inside because
     * the sphere radius is much larger than 40.
     */
    globe.position.set(
      0,
      0,
      isMobile ? -30 : -40
    )

    /*
     * LINE MATERIAL
     */
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: isMobile ? 0.045 : 0.065,
      depthWrite: false,
    })

    const geometries = []

    /*
     * HORIZONTAL LATITUDE RINGS
     */
    const latitudeCount = isMobile ? 14 : 20
    const latitudeSegments = 160

    for (let i = 1; i < latitudeCount; i++) {
      const latitude =
        (i / latitudeCount) * Math.PI -
        Math.PI / 2

      const y =
        Math.sin(latitude) * radius

      const ringRadius =
        Math.cos(latitude) * radius

      const points = []

      for (
        let j = 0;
        j <= latitudeSegments;
        j++
      ) {
        const angle =
          (j / latitudeSegments) *
          Math.PI *
          2

        points.push(
          new THREE.Vector3(
            Math.cos(angle) * ringRadius,
            y,
            Math.sin(angle) * ringRadius
          )
        )
      }

      const geometry =
        new THREE.BufferGeometry().setFromPoints(
          points
        )

      geometries.push(geometry)

      const line = new THREE.Line(
        geometry,
        lineMaterial
      )

      globe.add(line)
    }

    /*
     * VERTICAL LONGITUDE LINES
     */
    const longitudeCount = isMobile ? 18 : 28
    const longitudeSegments = 160

    for (
      let i = 0;
      i < longitudeCount;
      i++
    ) {
      const longitude =
        (i / longitudeCount) *
        Math.PI *
        2

      const points = []

      for (
        let j = 0;
        j <= longitudeSegments;
        j++
      ) {
        const latitude =
          (j / longitudeSegments) *
            Math.PI -
          Math.PI / 2

        const x =
          radius *
          Math.cos(latitude) *
          Math.cos(longitude)

        const y =
          radius *
          Math.sin(latitude)

        const z =
          radius *
          Math.cos(latitude) *
          Math.sin(longitude)

        points.push(
          new THREE.Vector3(x, y, z)
        )
      }

      const geometry =
        new THREE.BufferGeometry().setFromPoints(
          points
        )

      geometries.push(geometry)

      const line = new THREE.Line(
        geometry,
        lineMaterial
      )

      globe.add(line)
    }

    /*
     * STARTING ROTATION
     *
     * Slight horizontal rotation prevents the
     * longitude lines from appearing perfectly
     * symmetrical on first load.
     */
    globe.rotation.set(
      0,
      0.12,
      0
    )

    scene.add(globe)

    /*
     * SCROLL STATE
     */
    let targetScroll = window.scrollY
    let smoothScroll = targetScroll

    /*
     * Base rotation starts at our initial angle.
     */
    let baseRotation = 0.12

    let animationFrame

    /*
     * SCROLL
     */
    const handleScroll = () => {
      targetScroll = window.scrollY
    }

    /*
     * RESIZE
     */
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          width < DESKTOP_BREAKPOINT
            ? 1.15
            : 1.5
        )
      )

      renderer.setSize(
        width,
        height
      )
    }

    /*
     * ANIMATION LOOP
     */
    const animate = () => {
      /*
       * Smooth the raw browser scroll value.
       */
      smoothScroll +=
        (targetScroll - smoothScroll) *
        0.025

      /*
       * Very slow automatic horizontal rotation.
       */
      if (!reducedMotion.matches) {
        baseRotation += 0.00012
      }

      /*
       * Scroll rotates the sphere horizontally.
       *
       * Increase 0.00002 if you want more movement.
       */
      const scrollRotation =
        smoothScroll * 0.00002

      globe.rotation.y =
        baseRotation + scrollRotation

      /*
       * Never allow forward or sideways tilt.
       */
      globe.rotation.x = 0
      globe.rotation.z = 0

      camera.rotation.set(
        0,
        0,
        0
      )

      renderer.render(
        scene,
        camera
      )

      animationFrame =
        window.requestAnimationFrame(
          animate
        )
    }

    /*
     * EVENTS
     */
    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    window.addEventListener(
      'resize',
      handleResize
    )

    animate()

    /*
     * CLEANUP
     */
    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(
          animationFrame
        )
      }

      window.removeEventListener(
        'scroll',
        handleScroll
      )

      window.removeEventListener(
        'resize',
        handleResize
      )

      scene.remove(globe)

      geometries.forEach(
        (geometry) => {
          geometry.dispose()
        }
      )

      lineMaterial.dispose()
      renderer.dispose()

      if (
        renderer.domElement &&
        renderer.domElement.parentNode
      ) {
        renderer.domElement.parentNode.removeChild(
          renderer.domElement
        )
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="globe-background"
      aria-hidden="true"
    />
  )
}
