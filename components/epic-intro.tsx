"use client"

import { useEffect } from "react"
import Image from "next/image"

export function EpicIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 1200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden">
      {/* Logo container - sürekli büyüyor */}
      <div className="relative z-10">
        <div
          className="animate-zoom-in"
          style={{
            animation: 'zoomIn 1.2s ease-in forwards'
          }}
        >
          {/* Glowing effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 rounded-full blur-3xl opacity-50" />

          {/* Logo */}
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src="/logo.svg"
              alt="Automexus"
              width={160}
              height={160}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Company name */}
        <div
          className="text-center mt-8 opacity-0"
          style={{
            animation: 'fadeInOut 1.2s ease-in forwards'
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Automexus
          </h1>
        </div>
      </div>

      <style jsx>{`
        @keyframes zoomIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: scale(100);
            opacity: 0;
          }
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          70% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(0) scale(100);
          }
        }
      `}</style>
    </div>
  )
}
