"use client"

import { useEffect, useState } from "react"

export function EpicIntro({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),   // Logo fade in
      setTimeout(() => setStage(2), 600),   // Logo bana doğru gelsin (zoom in)
      setTimeout(() => onComplete(), 1400), // Complete - direkt geçiş
    ]

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      {/* Logo container */}
      <div className="relative z-10">
        <div
          className={`transition-all ease-in ${
            stage === 0 ? 'opacity-0 scale-50 duration-100' : ''
          } ${
            stage === 1 ? 'opacity-100 scale-100 duration-500' : ''
          } ${
            stage >= 2 ? 'scale-[50] opacity-0 duration-800' : ''
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
          className={`text-center mt-8 transition-all duration-500 ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${
            stage >= 2 ? 'opacity-0 scale-[50]' : ''
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Automexus
          </h1>
        </div>
      </div>
    </div>
  )
}
