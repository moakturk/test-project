"use client"

import { useEffect } from "react"
import Image from "next/image"

export function EpicIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Siyah arka plan - yavaşça kayboluyor */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          animation: 'fadeOutBackground 2.2s ease-in forwards'
        }}
      />

      {/* A ve çember - portal görevi görüyor - TAM ORTADA */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Dönen çember - A'nın etrafında */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: 'growTowardsViewer 2.2s ease-in forwards'
          }}
        >
          <div
            className="w-[400px] h-[400px] rounded-full border-[5px] border-primary-400/80"
            style={{
              animation: 'rotate 3s linear infinite',
              borderStyle: 'dashed'
            }}
          />
        </div>

        {/* A logosu - kapı/portal (içi boş, web sitesi görünüyor) */}
        <div
          className="relative z-10"
          style={{
            animation: 'growTowardsViewer 2.2s ease-in forwards'
          }}
        >
          {/* A Logosu - drop shadow sadece kenarlarında */}
          <div className="relative w-64 h-64 -ml-32 -mt-32" style={{
            filter: 'drop-shadow(0 0 40px rgba(0, 123, 255, 0.6)) drop-shadow(0 0 80px rgba(0, 123, 255, 0.3))'
          }}>
            <Image
              src="/animasyon_logo.svg"
              alt="Automexus"
              width={256}
              height={256}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes growTowardsViewer {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(50);
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

        @keyframes fadeOutBackground {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
