"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg md:text-2xl px-2.5 md:px-3 py-1.5 rounded-lg">
                A
              </div>
            </div>
            <span className="font-bold text-lg md:text-2xl bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent whitespace-nowrap">
              Automexus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="gradient" size="lg">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button variant="gradient" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
