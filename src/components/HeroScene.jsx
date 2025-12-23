import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';

const GlowIcosahedron = () => (
  <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.2}>
    <mesh castShadow>
      <icosahedronGeometry args={[1.6, 0]} />
      <meshStandardMaterial
        color="#667eea"
        metalness={0.4}
        roughness={0.2}
        emissive={0x22264d}
        emissiveIntensity={0.6}
      />
    </mesh>
  </Float>
);

const AccentTorus = () => (
  <Float speed={2.2} rotationIntensity={1.5} floatIntensity={1.4}>
    <mesh position={[2.6, -0.4, -1]} castShadow>
      <torusKnotGeometry args={[0.7, 0.2, 120, 16]} />
      <meshStandardMaterial
        color="#f093fb"
        metalness={0.3}
        roughness={0.35}
        emissive={0x3a1f3c}
        emissiveIntensity={0.5}
      />
    </mesh>
  </Float>
);

const AccentSphere = () => (
  <Float speed={1.8} rotationIntensity={1} floatIntensity={1.1}>
    <mesh position={[-2.4, 0.8, -0.6]} castShadow>
      <sphereGeometry args={[0.6, 48, 48]} />
      <meshStandardMaterial
        color="#7dd3fc"
        metalness={0.2}
        roughness={0.25}
        emissive={0x14364a}
        emissiveIntensity={0.45}
      />
    </mesh>
  </Float>
);

const HeroScene = () => {
  return (
    <div className="hero-canvas-wrapper">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0a0f"]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 5]} intensity={1.1} castShadow />
        <pointLight position={[-6, -4, -4]} intensity={0.4} />

        <Suspense fallback={null}>
          <GlowIcosahedron />
          <AccentTorus />
          <AccentSphere />
          <Stars radius={12} depth={30} count={4000} factor={0.6} fade speed={1} />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
