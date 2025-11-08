"use client"

import { useEffect } from "react"
import Image from "next/image"

export function EpicIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 1800)
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
            animation: 'ringExpand 1.8s ease-in forwards'
          }}
        >
          <div className="w-48 h-48 rounded-full border-4 border-primary-400/80"
            style={{
              animation: 'rotate 2s linear infinite'
            }}
          />
        </div>

        {/* A sembolü - bize doğru geliyor */}
        <div
          className="relative z-10"
          style={{
            animation: 'zoomIn 1.8s ease-in forwards'
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
          15% {
            opacity: 1;
          }
          100% {
            transform: scale(60);
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
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(60);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
