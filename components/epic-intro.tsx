"use client"

import { useEffect } from "react"
import Image from "next/image"

export function EpicIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden">
      {/* Logo ve çember container */}
      <div className="relative">
        {/* Dönen ve genişleyen çember */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: 'ringExpand 2s ease-out forwards'
          }}
        >
          <div className="w-64 h-64 rounded-full border-[3px] border-primary-400/60"
            style={{
              animation: 'rotate 3s linear infinite',
              borderStyle: 'dashed',
              borderSpacing: '10px'
            }}
          />
        </div>

        {/* Animasyon logosu - bize doğru geliyor */}
        <div
          className="relative z-10"
          style={{
            animation: 'zoomIn 2s ease-out forwards'
          }}
        >
          {/* Glowing effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 rounded-full blur-3xl opacity-40" />

          {/* Animasyon Logo */}
          <div className="relative w-40 h-40 md:w-48 md:h-48">
            <Image
              src="/animasyon_logo.svg"
              alt="Automexus"
              width={192}
              height={192}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes zoomIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: scale(80);
            opacity: 0;
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes ringExpand {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(80);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
