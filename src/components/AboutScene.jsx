import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

const AnimatedSphere = ({ position, color, speed = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });
  
  return (
    <Float speed={2 * speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const AboutScene = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <AnimatedSphere position={[-3, 1, 0]} color="#667eea" speed={0.8} />
          <AnimatedSphere position={[3, -1, -2]} color="#764ba2" speed={1.2} />
          <AnimatedSphere position={[0, 2, -1]} color="#f093fb" speed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AboutScene;
