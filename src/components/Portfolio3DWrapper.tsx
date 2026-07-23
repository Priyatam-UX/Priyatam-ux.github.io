'use client';

import React, { useRef, useEffect, useState } from 'react';
import { View, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { JobPilotModel, StadiumPilotModel, MonsoonShieldModel, CookingPlannerModel } from './Portfolio3DModels';

let canvasMounted = false;

export default function Portfolio3DWrapper({ type, color, eventSource }: { type: string, color: string, eventSource: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    // Determine if this is the first instance to mount the global Canvas
    if (!canvasMounted) {
      canvasMounted = true;
      setIsFirst(true);
    }
    
    // Cleanup on unmount if we were the one who mounted it (for HMR)
    return () => {
      if (isFirst) {
        canvasMounted = false;
      }
    }
  }, [isFirst]);

  return (
    <>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />
      
      <View track={containerRef}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={1} color={color} />
        
        {type === 'jobpilot' && <JobPilotModel color={color} />}
        {type === 'stadiumpilot' && <StadiumPilotModel color={color} />}
        {type === 'monsoonshield' && <MonsoonShieldModel color={color} />}
        {type === 'cookingplanner' && <CookingPlannerModel color={color} />}
      </View>

      {isFirst && (
        <Canvas 
          eventSource={eventSource} 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            pointerEvents: 'none', 
            // We set zIndex to 5 so it sits above the background but below the text (z-index 10)
            zIndex: 5 
          }}
        >
          <View.Port />
          <Preload all />
        </Canvas>
      )}
    </>
  );
}
