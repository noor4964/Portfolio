import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

const MessageIcon = ({ position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={meshRef} position={position}>
        <Box args={[1.2, 0.8, 0.1]}>
          <meshStandardMaterial
            color="#667eea"
            metalness={0.5}
            roughness={0.3}
            emissive="#667eea"
            emissiveIntensity={0.2}
          />
        </Box>
        <mesh position={[0, -0.2, 0.15]} rotation={[0.3, 0, 0]}>
          <coneGeometry args={[0.6, 0.4, 3]} />
          <meshStandardMaterial
            color="#764ba2"
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
};

const EmailElements = () => {
  return (
    <>
      <MessageIcon position={[-2, 0.5, 0]} />
      <MessageIcon position={[2.5, -0.8, -1]} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Torus args={[0.5, 0.15, 16, 50]} position={[0, 1.5, -2]}>
          <meshStandardMaterial
            color="#f093fb"
            metalness={0.6}
            roughness={0.2}
            emissive="#f093fb"
            emissiveIntensity={0.3}
          />
        </Torus>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.9}>
        <Sphere args={[0.4, 32, 32]} position={[-3, -1, -1.5]}>
          <meshStandardMaterial
            color="#7dd3fc"
            metalness={0.4}
            roughness={0.3}
            emissive="#7dd3fc"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>
    </>
  );
};

const ContactScene = () => {
  return (
    <div style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.25,
      pointerEvents: 'none',
      zIndex: 0
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#667eea" intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
        
        <Suspense fallback={null}>
          <EmailElements />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ContactScene;
