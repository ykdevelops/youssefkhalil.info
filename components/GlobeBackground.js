'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const DESKTOP_BREAKPOINT = 768

const INITIAL_ROTATION = 0.12
const AUTO_ROTATION_SPEED = 0.02
const SCROLL_ROTATION_SPEED = 0.00002
const SCROLL_DAMPING = 1.5

function getGlobeConfig(isMobile) {
  return {
    radius: isMobile ? 115 : 140,
    z: isMobile ? 30 : -100,
    latitudeCount: isMobile ? 14 : 20,
    longitudeCount: isMobile ? 18 : 28,
    segments: isMobile ? 96 : 160,
    opacity: isMobile ? 0.045 : 0.065,
  }
}

/*
 * Build every latitude and longitude line into
 * one BufferGeometry.
 *
 * LineSegments expects pairs of vertices:
 *
 * [start, end]
 * [start, end]
 * [start, end]
 */
function createGlobeGeometry(config) {
  const {
    radius,
    latitudeCount,
    longitudeCount,
    segments,
  } = config

  const positions = []

  /*
   * LATITUDE RINGS
   */
  for (let i = 1; i < latitudeCount; i++) {
    const latitude =
      (i / latitudeCount) * Math.PI -
      Math.PI / 2

    const y =
      Math.sin(latitude) * radius

    const ringRadius =
      Math.cos(latitude) * radius

    for (let j = 0; j < segments; j++) {
      const angle1 =
        (j / segments) * Math.PI * 2

      const angle2 =
        ((j + 1) / segments) * Math.PI * 2

      positions.push(
        Math.cos(angle1) * ringRadius,
        y,
        Math.sin(angle1) * ringRadius,

        Math.cos(angle2) * ringRadius,
        y,
        Math.sin(angle2) * ringRadius
      )
    }
  }

  /*
   * LONGITUDE LINES
   */
  for (let i = 0; i < longitudeCount; i++) {
    const longitude =
      (i / longitudeCount) * Math.PI * 2

    for (let j = 0; j < segments; j++) {
      const latitude1 =
        (j / segments) * Math.PI -
        Math.PI / 2

      const latitude2 =
        ((j + 1) / segments) * Math.PI -
        Math.PI / 2

      const x1 =
        radius *
        Math.cos(latitude1) *
        Math.cos(longitude)

      const y1 =
        radius *
        Math.sin(latitude1)

      const z1 =
        radius *
        Math.cos(latitude1) *
        Math.sin(longitude)

      const x2 =
        radius *
        Math.cos(latitude2) *
        Math.cos(longitude)

      const y2 =
        radius *
        Math.sin(latitude2)

      const z2 =
        radius *
        Math.cos(latitude2) *
        Math.sin(longitude)

      positions.push(
        x1,
        y1,
        z1,

        x2,
        y2,
        z2
      )
    }
  }

  const geometry = new THREE.BufferGeometry()

  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      positions,
      3
    )
  )

  return geometry
}

export default function GlobeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current

    if (!mount) return

    /*
     * REDUCED MOTION
     */
    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    let reducedMotion =
      motionQuery.matches

    const handleMotionChange = (event) => {
      reducedMotion = event.matches
    }

    motionQuery.addEventListener(
      'change',
      handleMotionChange
    )

    /*
     * SIZE
     */
    const getSize = () => ({
      width:
        mount.clientWidth ||
        window.innerWidth,

      height:
        mount.clientHeight ||
        window.innerHeight,
    })

    const initialSize = getSize()

    let isMobile =
      initialSize.width <
      DESKTOP_BREAKPOINT

    /*
     * SCENE
     */
    const scene = new THREE.Scene()

    /*
     * CAMERA
     */
    const camera =
      new THREE.PerspectiveCamera(
        62,
        initialSize.width /
          initialSize.height,
        0.1,
        400
      )

    camera.position.set(0, 0, 0)

    /*
     * RENDERER
     */
    const renderer =
      new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      })

    const getPixelRatio = (mobile) =>
      Math.min(
        window.devicePixelRatio || 1,
        mobile ? 1.15 : 1.5
      )

    renderer.setPixelRatio(
      getPixelRatio(isMobile)
    )

    renderer.setSize(
      initialSize.width,
      initialSize.height,
      false
    )

    renderer.setClearColor(
      0x000000,
      0
    )

    /*
     * Let CSS control the displayed canvas size.
     */
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'

    mount.appendChild(
      renderer.domElement
    )

    /*
     * GLOBE
     */
    let config =
      getGlobeConfig(isMobile)

    let geometry =
      createGlobeGeometry(config)

    const material =
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: config.opacity,
        depthWrite: false,
      })

    const globe =
      new THREE.LineSegments(
        geometry,
        material
      )

    globe.position.set(
      0,
      0,
      config.z
    )

    globe.rotation.set(
      0,
      INITIAL_ROTATION,
      0
    )

    scene.add(globe)

    /*
     * SCROLL STATE
     */
    let targetScroll =
      window.scrollY

    let smoothScroll =
      targetScroll

    let baseRotation =
      INITIAL_ROTATION

    const handleScroll = () => {
      targetScroll =
        window.scrollY
    }

    /*
     * RESPONSIVE GLOBE
     */
    const updateGlobe = (
      nextIsMobile
    ) => {
      if (
        nextIsMobile === isMobile
      ) {
        return
      }

      isMobile = nextIsMobile

      config =
        getGlobeConfig(isMobile)

      const nextGeometry =
        createGlobeGeometry(config)

      globe.geometry =
        nextGeometry

      geometry.dispose()

      geometry =
        nextGeometry

      globe.position.z =
        config.z

      material.opacity =
        config.opacity
    }

    /*
     * RESIZE
     */
    const handleResize = () => {
      const {
        width,
        height,
      } = getSize()

      const nextIsMobile =
        width <
        DESKTOP_BREAKPOINT

      updateGlobe(
        nextIsMobile
      )

      camera.aspect =
        width / height

      camera.updateProjectionMatrix()

      renderer.setPixelRatio(
        getPixelRatio(nextIsMobile)
      )

      renderer.setSize(
        width,
        height,
        false
      )
    }

    const resizeObserver =
      new ResizeObserver(
        handleResize
      )

    resizeObserver.observe(mount)

    /*
     * ANIMATION
     */
    let animationFrame = 0
    let previousTime =
      performance.now()

    const animate = (time) => {
      /*
       * Seconds since previous frame.
       *
       * Clamp the value so returning to the
       * tab does not cause a large animation jump.
       */
      const delta = Math.min(
        (time - previousTime) / 1000,
        0.1
      )

      previousTime = time

      if (!reducedMotion) {
        /*
         * Frame-rate-independent scroll smoothing.
         */
        smoothScroll =
          THREE.MathUtils.damp(
            smoothScroll,
            targetScroll,
            SCROLL_DAMPING,
            delta
          )

        /*
         * Frame-rate-independent automatic spin.
         */
        baseRotation +=
          AUTO_ROTATION_SPEED *
          delta

        const scrollRotation =
          smoothScroll *
          SCROLL_ROTATION_SPEED

        globe.rotation.y =
          baseRotation +
          scrollRotation
      }

      renderer.render(
        scene,
        camera
      )

      animationFrame =
        requestAnimationFrame(
          animate
        )
    }

    /*
     * EVENTS
     */
    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      }
    )

    animationFrame =
      requestAnimationFrame(
        animate
      )

    /*
     * CLEANUP
     */
    return () => {
      cancelAnimationFrame(
        animationFrame
      )

      window.removeEventListener(
        'scroll',
        handleScroll
      )

      motionQuery.removeEventListener(
        'change',
        handleMotionChange
      )

      resizeObserver.disconnect()

      scene.remove(globe)

      geometry.dispose()
      material.dispose()

      renderer.dispose()

      renderer.domElement.remove()
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