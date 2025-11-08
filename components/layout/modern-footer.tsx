import Link from "next/link"
import Image from "next/image"
import { Mail, Linkedin, Twitter, Github } from "lucide-react"

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ],
  services: [
    { name: "Process Automation", href: "/services" },
    { name: "Marketing Automation", href: "/services" },
    { name: "CRM Automation", href: "/services" },
    { name: "Data Analytics", href: "/services" },
    { name: "AI Assistants", href: "/services" },
    { name: "Custom Solutions", href: "/services" },
  ],
}

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
  { name: "Email", icon: Mail, href: "mailto:info@automexus.com" },
]

export function ModernFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black border-t border-gray-900">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center group">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src="/logo.svg"
                  alt="Automexus"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain transition-transform group-hover:scale-110"
                />
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Transforming businesses with intelligent AI automation solutions.
              Scale your operations, reduce costs, and unlock new possibilities.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-3 rounded-lg bg-gray-900 hover:bg-primary-500/10 border border-gray-800 hover:border-primary-500/50 text-gray-400 hover:text-primary-400 transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Automexus. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Made with</span>
            <span className="text-primary-500">♦</span>
            <span>by Automexus Team</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
