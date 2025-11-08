"use client"

import { useEffect } from "react"
import Image from "next/image"

export function EpicIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 1500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden">
      {/* Logo container - sürekli büyüyor */}
      <div className="relative">
        {/* Dönen noktalar */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 w-3 h-3 -ml-1.5 -mt-1.5"
            style={{
              animation: `orbit 2s linear infinite, zoomOut 1.5s ease-in forwards`,
              animationDelay: `${i * 0.125}s, 0s`,
              transform: `rotate(${i * 45}deg) translateX(80px)`,
            }}
          >
            <div className="w-full h-full bg-primary-400 rounded-full opacity-80" />
          </div>
        ))}

        {/* Logo - bize doğru geliyor */}
        <div
          className="relative z-10"
          style={{
            animation: 'zoomIn 1.5s ease-in forwards'
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
      </div>

      <style jsx>{`
        @keyframes zoomIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: scale(50);
            opacity: 0;
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(80px);
          }
          100% {
            transform: rotate(360deg) translateX(80px);
          }
        }

        @keyframes zoomOut {
          0% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(50);
          }
        }
      `}</style>
    </div>
  )
}
