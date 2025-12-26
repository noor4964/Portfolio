import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

const FloatingIcon = ({ position, rotation, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = rotation[1] + Math.cos(state.clock.elapsedTime) * 0.2;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

const OrbitRing = ({ radius, count, color }) => {
  const groupRef = useRef();
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });
  
  const icons = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    icons.push(
      <FloatingIcon
        key={i}
        position={[x, 0, z]}
        rotation={[0, angle, 0]}
        color={color}
      />
    );
  }
  
  return (
    <group ref={groupRef}>
      {icons}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const SkillsScene = () => {
  return (
    <div style={{ 
      position: 'absolute', 
      width: '100%',
      height: '400px',
      opacity: 0.4,
      pointerEvents: 'none',
      margin: '2rem 0'
    }}>
      <Canvas 
        camera={{ position: [0, 2, 10], fov: 50 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        frameloop="demand"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} color="#667eea" intensity={0.5} />
        
        <Suspense fallback={null}>
          <OrbitRing radius={3} count={6} color="#667eea" />
          <OrbitRing radius={5} count={8} color="#764ba2" />
          <OrbitRing radius={7} count={10} color="#f093fb" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SkillsScene;
