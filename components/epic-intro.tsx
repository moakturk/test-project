"use client"

import { useEffect } from "react"
import Image from "next/image"

export function EpicIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Siyah arka plan - yavaşça kayboluyor */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          animation: 'fadeOutBackground 2.8s ease-in forwards'
        }}
      />

      {/* A ve çember - portal görevi görüyor */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Dönen çember - A'nın etrafında */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              animation: 'growTowardsViewer 2.8s ease-in forwards'
            }}
          >
            <div
              className="w-96 h-96 rounded-full border-[5px] border-primary-400/80"
              style={{
                animation: 'rotate 4s linear infinite',
                borderStyle: 'dashed'
              }}
            />
          </div>

          {/* A logosu - kapı/portal (içinden web sitesi görünecek) */}
          <div
            className="relative z-10"
            style={{
              animation: 'growTowardsViewer 2.8s ease-in forwards'
            }}
          >
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 rounded-full blur-3xl opacity-30" />

            {/* A Logosu */}
            <div className="relative w-80 h-80">
              <Image
                src="/animasyon_logo.svg"
                alt="Automexus"
                width={320}
                height={320}
                className="w-full h-full object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes growTowardsViewer {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          90% {
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
          60% {
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
