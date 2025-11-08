"use client"

import { useEffect, useState } from "react"

export function EpicIntro({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),   // Logo fade in
      setTimeout(() => setStage(2), 800),   // Logo scale
      setTimeout(() => setStage(3), 1400),  // Particles explode
      setTimeout(() => setStage(4), 2000),  // Fade out
      setTimeout(() => onComplete(), 2500), // Complete
    ]

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  if (stage >= 4) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-primary-400 rounded-full transition-all duration-1000 ${
              stage >= 3 ? 'opacity-0 scale-[20]' : 'opacity-0'
            }`}
            style={{
              left: '50%',
              top: '50%',
              transform: stage >= 3
                ? `translate(${(Math.random() - 0.5) * 2000}px, ${(Math.random() - 0.5) * 2000}px)`
                : 'translate(-50%, -50%)',
              transitionDelay: `${i * 20}ms`,
            }}
          />
        ))}
      </div>

      {/* Logo container */}
      <div className="relative z-10">
        <div
          className={`transition-all duration-700 ${
            stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          } ${
            stage >= 2 ? 'scale-110' : ''
          } ${
            stage >= 3 ? 'scale-[20] opacity-0' : ''
          }`}
        >
          {/* Glowing effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 rounded-full blur-3xl opacity-50 animate-pulse" />

          {/* Logo */}
          <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-6xl md:text-8xl px-12 py-8 rounded-2xl shadow-2xl shadow-primary-500/50">
            A
          </div>
        </div>

        {/* Company name */}
        <div
          className={`text-center mt-8 transition-all duration-500 delay-300 ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${
            stage >= 3 ? 'opacity-0' : ''
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Automexus
          </h1>
        </div>
      </div>

      {/* Progress line */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-2000"
        style={{ width: `${(stage / 4) * 100}%` }}
      />
    </div>
  )
}
