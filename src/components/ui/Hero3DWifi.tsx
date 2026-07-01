import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import type { Group, Mesh } from 'three'

function WifiSymbol() {
  const groupRef = useRef<Group>(null!)
  const dotRef = useRef<Mesh>(null!)
  const torus1Ref = useRef<Mesh>(null!)
  const torus2Ref = useRef<Mesh>(null!)
  const torus3Ref = useRef<Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const px = state.pointer.x
    const py = state.pointer.y

    if (groupRef.current) {
      groupRef.current.rotation.x = py * 0.12
      groupRef.current.rotation.y = px * 0.18
    }

    const mats = [
      dotRef.current?.material,
      torus1Ref.current?.material,
      torus2Ref.current?.material,
      torus3Ref.current?.material,
    ] as const

    if (mats[0]) (mats[0] as any).emissiveIntensity = 0.5 + Math.sin(t * 1.8) * 0.4
    if (mats[1]) (mats[1] as any).emissiveIntensity = 0.3 + Math.sin(t * 1.8 - 0.5) * 0.25
    if (mats[2]) (mats[2] as any).emissiveIntensity = 0.3 + Math.sin(t * 1.8 - 1.0) * 0.2
    if (mats[3]) (mats[3] as any).emissiveIntensity = 0.3 + Math.sin(t * 1.8 - 1.5) * 0.2
  })

  const glass = {
    transmission: 0.92,
    roughness: 0.04,
    metalness: 0.1,
    thickness: 0.6,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
    envMapIntensity: 1.5,
    emissive: '#4274D9',
    color: '#4274D9',
    emissiveIntensity: 0.3,
  }

  return (
    <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.6}>
      <group ref={groupRef}>
        <mesh ref={dotRef} position={[0, -0.65, 0]}>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshPhysicalMaterial {...glass} />
        </mesh>

        <mesh ref={torus1Ref} position={[0, -0.35, 0]} rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[0.38, 0.025, 16, 48, Math.PI / 1.5]} />
          <meshPhysicalMaterial {...glass} />
        </mesh>

        <mesh ref={torus2Ref} position={[0, -0.05, 0]} rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[0.65, 0.03, 16, 48, Math.PI / 1.5]} />
          <meshPhysicalMaterial {...glass} />
        </mesh>

        <mesh ref={torus3Ref} position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[0.92, 0.035, 16, 48, Math.PI / 1.5]} />
          <meshPhysicalMaterial {...glass} />
        </mesh>
      </group>
    </Float>
  )
}

export function Hero3DWifi() {
  return (
    <div className="w-full h-full min-h-[300px] lg:min-h-[500px]">
      <Suspense
        fallback={
          <div className="w-full h-full min-h-[300px] lg:min-h-[500px] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-primary-blue/30 border-t-primary-blue animate-spin" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 3.8], fov: 42 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <WifiSymbol />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  )
}
