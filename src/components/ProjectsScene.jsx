import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';

const FloatingCard = ({ position, delay = 0 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.3;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <RoundedBox
        ref={meshRef}
        args={[1.5, 2, 0.1]}
        position={position}
        radius={0.05}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#667eea"
          metalness={0.3}
          roughness={0.4}
          emissive="#667eea"
          emissiveIntensity={0.1}
          transparent
          opacity={0.8}
        />
      </RoundedBox>
    </Float>
  );
};

const ProjectsScene = () => {
  return (
    <div style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.15,
      pointerEvents: 'none',
      zIndex: 0
    }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} color="#764ba2" intensity={0.4} />
        
        <Suspense fallback={null}>
          <FloatingCard position={[-4, 1, 0]} delay={0} />
          <FloatingCard position={[0, -0.5, -1]} delay={1} />
          <FloatingCard position={[4, 0.5, -2]} delay={2} />
          <FloatingCard position={[-2, -2, -1.5]} delay={1.5} />
          <FloatingCard position={[3, 2, -0.5]} delay={2.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ProjectsScene;
