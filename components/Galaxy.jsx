'use client'; // This is mandatory for WebGL animations
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

// Copy the vertexShader and fragmentShader strings exactly from React Bits Code section
const vertexShader = `...`; 
const fragmentShader = `...`;

export default function Galaxy({ density = 1.0, glowIntensity = 0.5, hueShift = 240 }) {
    const containerRef = useRef();

    useEffect(() => {
        // Paste the logic from React Bits "Code" -> "JavaScript" section here
        // Ensure you append the canvas to containerRef.current
    }, [density, glowIntensity, hueShift]);

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 z-[-1] pointer-events-none bg-black" 
        />
    );
}